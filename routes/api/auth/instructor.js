const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../../middlewares/auth');

const Instructor = require('../../../models/Instructor');

const router = express.Router();

// @route		GET: api/instructors
// @desc		Retrieve authenticated instructor
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const instructor = await Instructor.findById(req.account.id).select('-password');

		res.status(200).json({ instructor });
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/instructors
// @desc		Register new instructor
// @access		Public
router.post(
	'/',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password must be of 6 or more characters').not().isEmpty(),
		check('name', 'name is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { email, password, name } = req.body;

		try {
			const instructor = new Instructor({ email, password, name });

			const salt = await bcrypt.genSalt(10);
			instructor.password = await bcrypt.hash(instructor.password, salt);

			await instructor.save();

			const payload = {
				account: {
					id: instructor.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) =>
				err ? res.json({ err }) : res.status(201).json({ msg: 'instructor created', token })
			);
		} catch (err) {
			if (err.code === 11000 && 'email' in err.keyPattern) {
				return res.status(409).json({ errors: [{ msg: 'instructor already exists' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		POST: api/instructors
// @desc		Login instructor account
// @access		Public
router.post(
	'/login',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password must be of 6 or more characters').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const instructor = await Instructor.findOne({ email });
			if (!instructor) {
				return res.status(404).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const hasPasswordsMatched = await bcrypt.compare(password, instructor.password);
			if (!hasPasswordsMatched) {
				return res.status(404).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const payload = {
				account: {
					id: instructor.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) =>
				err ? res.json({ err }) : res.status(201).json({ msg: 'instructor created', token })
			);
		} catch (err) {
			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

module.exports = router;
