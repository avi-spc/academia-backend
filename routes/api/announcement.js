const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');

const Announcement = require('../../models/Announcement');

const router = express.Router();

// @route		POST: /api/announcements/:course_id
// @desc		Create an announcement
// @access		Private
router.post(
	'/:course_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('message', 'message is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, message } = req.body;

		try {
			const announcements = await Announcement.findOneAndUpdate(
				{ course: req.params.course_id },
				{ $push: { announcements: { title, message } } },
				{ new: true }
			);

			res.status(201).json({ msg: 'announcement created', announcements });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		GET: /api/announcements/:course_id
// @desc		Retrieve all announcements for a course
// @access		Private
router.get('/:course_id', auth, async (req, res) => {
	try {
		const announcements = await Announcement.findOne({ course: req.params.course_id });
		if (!announcements) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(200).json({ announcements });
	} catch (error) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: /api/announcements/:course_id/:announcement_id'
// @desc		Retrieve announcements by id
// @access		Private
router.get('/:course_id/:announcement_id', auth, async (req, res) => {
	try {
		const course = await Announcement.findOne({ course: req.params.course_id });
		if (!course) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		const announcement = course.announcements.find(
			(announcement) => announcement._id.toString() === req.params.announcement_id
		);

		res.status(200).json({ announcement });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

module.exports = router;
