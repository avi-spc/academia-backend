const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../../middlewares/auth');

const Student = require('../../../models/Student');
const Performance = require('../../../models/Performance');

const router = express.Router();

// @route		GET: api/students
// @desc		Retrieve authenticated student
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const student = await Student.findById(req.account.id).select('-password');

		res.status(200).json({ student });
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/students
// @desc		Register new student
// @access		Public
router.post(
	'/',
	[
		check('instituteId', 'id is required').not().isEmpty(),
		check('password', 'password must be of 6 or more characters').not().isEmpty(),
		check('name', 'name is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { instituteId, password, name } = req.body;

		try {
			const student = new Student({ instituteId, password, name });

			const salt = await bcrypt.genSalt(10);
			student.password = await bcrypt.hash(student.password, salt);

			await student.save();

			const performance = new Performance({ student: student.id });

			await performance.save();

			const payload = {
				account: {
					id: student.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) =>
				err ? res.json({ err }) : res.status(201).json({ msg: 'student created', token })
			);
		} catch (err) {
			if (err.code === 11000 && 'instituteId' in err.keyPattern) {
				return res.status(409).json({ errors: [{ msg: 'student already exists' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		POST: api/students
// @desc		Login student account
// @access		Public
router.post(
	'/login',
	[
		check('instituteId', 'id is required').not().isEmpty(),
		check('password', 'password must be of 6 or more characters').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { instituteId, password } = req.body;

		try {
			const student = await Student.findOne({ instituteId });
			if (!student) {
				return res.status(404).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const hasPasswordsMatched = await bcrypt.compare(password, student.password);
			if (!hasPasswordsMatched) {
				return res.status(404).json({ errors: [{ msg: 'invalid credentials' }] });
			}

			const payload = {
				account: {
					id: student.id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) =>
				err ? res.json({ err }) : res.status(201).json({ msg: 'student created', token })
			);
		} catch (err) {
			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		GET: api/students//:course_id
// @desc		Retrieve all students enrolled into a particular course
// @access		Private
router.get('/:course_id', auth, async (req, res) => {
	try {
		const students = await Student.find({
			coursesEnrolled: { $elemMatch: { course: req.params.course_id } }
		});

		res.status(200).json({ students });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

module.exports = router;
