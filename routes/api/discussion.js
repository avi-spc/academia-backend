const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');

const Discussion = require('../../models/Discussion');

const router = express.Router();

// @route		POST: api/discussions/:course_id/:reference_id/:reference_category
// @desc		Create a discussion
// @access		Private
router.post(
	'/:course_id/:reference_id/:reference_category',
	[auth, [check('issue', 'issue is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { issue } = req.body;

		try {
			const discussions = await Discussion.findOneAndUpdate(
				{ course: req.params.course_id },
				{
					$push: {
						discussions: {
							createdBy: req.account.id,
							issue,
							reference: {
								id: req.params.reference_id,
								category: req.params.reference_category
							}
						}
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'discussion created', discussions });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		GET: api/discussions/:course_id
// @desc		Retrieve all discussions for a course
// @access		Private
router.get('/:course_id', auth, async (req, res) => {
	try {
		const discussions = await Discussion.findOne({ course: req.params.course_id });
		if (!discussions) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(200).json({ discussions });
	} catch (error) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: api/discussions/:course_id/:discussion_id
// @desc		Retrieve discussion by id
// @access		Private
router.get('/:course_id/:discussion_id', auth, async (req, res) => {
	try {
		const course = await Discussion.findOne({ course: req.params.course_id });
		if (!course) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		const discussion = course.discussions.find(
			(discussion) => discussion._id.toString() === req.params.discussion_id
		);

		res.status(200).json({ discussion });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/discussions/:course_id/:discussion_id
// @desc		Add comment to discussion
// @access		Private
router.post(
	'/:course_id/:discussion_id',
	[auth, [check('text', 'text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { text } = req.body;

		try {
			const discussions = await Discussion.findOneAndUpdate(
				{
					course: req.params.course_id,
					discussions: { $elemMatch: { _id: req.params.discussion_id } }
				},
				{
					$push: {
						'discussions.$.comments': { student: req.account.id, text }
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'comment submitted', discussions });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

module.exports = router;
