const { mongoose } = require('mongoose');
const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');
const { SubmissionStream } = require('../../config/db');

const Announcement = require('../../models/Announcement');
const Course = require('../../models/Course');
const Discussion = require('../../models/Discussion');
const Instructor = require('../../models/Instructor');
const Performance = require('../../models/Performance');

const router = express.Router();

// @route		GET: api/courses
// @desc		Retrieve all courses
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const courses = await Course.find({ instructor: req.account.id }).sort({
			createdAt: 'desc'
		});

		res.status(200).json({ courses });
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: api/courses/:course_id
// @desc		Retrieve course by id
// @access		Private
router.get('/:course_id', auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.course_id).populate('instructor');
		if (!course) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(200).json({ course });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/courses
// @desc		Create new course
// @access		Private
router.post(
	'/',
	[
		auth,
		[
			check('code', 'code is required').not().isEmpty(),
			check('name', 'name is required').not().isEmpty(),
			check('credits', 'credits are required').isNumeric().not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { code, name, credits } = req.body;

		try {
			const course = new Course({
				code,
				name,
				credits,
				instructor: req.account.id
			});

			await course.save();

			await Course.findByIdAndUpdate(
				course.id,
				{ $set: { accessCode: course.id.substring(19) } },
				{ new: true }
			);

			const instructor = await Instructor.findByIdAndUpdate(
				req.account.id,
				{ $addToSet: { coursesIncharge: { course: course.id } } },
				{ new: true }
			).populate('coursesIncharge.course');

			const announcement = new Announcement({
				course: course.id
			});

			const discussion = new Discussion({
				course: course.id
			});

			await announcement.save();
			await discussion.save();

			res.status(201).json({
				msg: 'course created',
				account: instructor,
				type: 'instructor'
			});
		} catch (err) {
			if ((err.code === 11000 && 'code' in err.keyPattern) || 'name' in err.keyPattern) {
				return res.status(409).json({ errors: [{ msg: 'course already exists' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/:course_id
// @desc		Update course
// @access		Private
router.put(
	'/:course_id',
	[
		auth,
		[
			check('code', 'code is required').not().isEmpty(),
			check('name', 'name is required').not().isEmpty(),
			check('credits', 'credits are required').isNumeric().not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { code, name, credits } = req.body;

		try {
			const course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{ $set: { code, name, credits } },
				{ new: true }
			);

			const instructor = await Instructor.findById(req.account.id).populate(
				'coursesIncharge.course'
			);

			res.status(200).json({
				msg: 'course updated',
				account: instructor,
				type: req.account.type
			});
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/assignments/:course_id
// @desc		Add assignment to course
// @access		Private
router.put(
	'/assignments/:course_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('documentId', 'document is required').not().isEmpty(),
			check('deadline', 'deadline is required').not().isEmpty(),
			check('maxMarks', 'maxMarks is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, documentId, deadline, maxMarks } = req.body;

		try {
			let course = await Course.findById(req.params.course_id);
			if (!course) {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{ $push: { assignments: { title, documentId, deadline, maxMarks } } },
				{ new: true }
			);

			res.status(201).json({ msg: 'assignment created', course });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/assignments/:course_id/:assignment_id
// @desc		Update assignment
// @access		Private
router.put(
	'/assignments/:course_id/:assignment_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('deadline', 'deadline is required').not().isEmpty(),
			check('maxMarks', 'maxMarks is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, deadline, maxMarks } = req.body;

		try {
			const course = await Course.findOneAndUpdate(
				{
					_id: req.params.course_id,
					assignments: { $elemMatch: { _id: req.params.assignment_id } }
				},
				{
					$set: {
						'assignments.$.title': title,
						'assignments.$.deadline': deadline,
						'assignments.$.maxMarks': maxMarks
					}
				},
				{ new: true }
			);

			res.status(200).json({ msg: 'assignment updated', course });
		} catch (err) {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/assignments/:course_id/:assignment_id/:document_id
// @desc		Update assignment doc
// @access		Private
router.put(
	'/assignments/:course_id/:assignment_id/:document_id',
	[auth, [check('documentId', 'document is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { documentId } = req.body;

		try {
			const course = await Course.findOneAndUpdate(
				{
					_id: req.params.course_id,
					assignments: { $elemMatch: { _id: req.params.assignment_id } }
				},
				{
					$set: {
						'assignments.$.documentId': documentId
					}
				},
				{ new: true }
			);

			await SubmissionStream().delete(
				mongoose.Types.ObjectId(req.params.document_id),
				(err, result) => {
					if (err) {
						return res.status(404).json({
							errors: [{ msg: err }]
						});
					}
				}
			);

			res.status(201).json({ msg: 'assignment document updated', course });
		} catch (err) {
			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		DELETE: api/courses/assignments/:course_id/:assignment_id
// @desc		Remove assignment from course
// @access		Private
router.delete('/assignments/:course_id/:assignment_id', auth, async (req, res) => {
	try {
		let course = await Course.findOne({
			_id: req.params.course_id,
			instructor: req.account.id
		});

		const assignment = course.assignments.find(
			(assignment) => assignment._id.toString() === req.params.assignment_id
		);

		if (!assignment) {
			return res.status(404).json({ errors: [{ msg: 'assignment not found' }] });
		}

		course = await Course.findOneAndUpdate(
			{
				_id: req.params.course_id,
				instructor: req.account.id,
				assignments: { $elemMatch: { _id: req.params.assignment_id } }
			},
			{ $pull: { assignments: { _id: req.params.assignment_id } } },
			{ new: true }
		);

		await SubmissionStream().delete(assignment.documentId, (err, result) => {
			if (err) {
				return res.status(404).json({
					errors: [{ msg: err }]
				});
			}
		});

		await Performance.updateMany(
			{ performance: { $elemMatch: { course: req.params.course_id } } },
			{
				$pull: {
					'performance.$.assignments': { id: req.params.assignment_id }
				}
			},
			{ new: true }
		);

		res.status(200).json({ msg: 'assignment removed', course });
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		PUT: api/courses/material/:course_id
// @desc		Add study material to course
// @access		Private
router.put(
	'/material/:course_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('documentId', 'document is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, documentId } = req.body;

		try {
			let course = await Course.findById(req.params.course_id);
			if (!course) {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{ $push: { 'studyMaterial.notes': { title, documentId } } },
				{ new: true }
			);

			res.status(201).json({ msg: 'notes created', course });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/material/:course_id:notes_id
// @desc		Update study material
// @access		Private
router.put(
	'/material/:course_id/:notes_id',
	[auth, [check('title', 'title is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title } = req.body;

		try {
			const course = await Course.findOneAndUpdate(
				{
					_id: req.params.course_id,
					'studyMaterial.notes': { $elemMatch: { _id: req.params.notes_id } }
				},
				{
					$set: {
						'studyMaterial.notes.$.title': title
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'study material updated', course });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/material/:course_id/:notes_id/:document_id
// @desc		Update study material doc
// @access		Private
router.put(
	'/material/:course_id/:notes_id/:document_id',
	[auth, [check('documentId', 'document is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { documentId } = req.body;

		try {
			const course = await Course.findOneAndUpdate(
				{
					_id: req.params.course_id,
					'studyMaterial.notes': { $elemMatch: { _id: req.params.notes_id } }
				},
				{
					$set: {
						'studyMaterial.notes.$.documentId': documentId
					}
				},
				{ new: true }
			);

			await SubmissionStream().delete(
				mongoose.Types.ObjectId(req.params.document_id),
				(err, result) => {
					if (err) {
						return res.status(404).json({
							errors: [{ msg: err }]
						});
					}
				}
			);

			res.status(201).json({ msg: 'notes document updated', course });
		} catch (err) {
			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		DELETE: api/courses/material/:course_id/:notes_id
// @desc		Remove study material from course
// @access		Private
router.delete('/material/:course_id/:notes_id', auth, async (req, res) => {
	try {
		let course = await Course.findOne({
			_id: req.params.course_id,
			instructor: req.account.id
		});

		const notes = course.studyMaterial.notes.find(
			(notes) => notes._id.toString() === req.params.notes_id
		);

		if (!notes) {
			return res.status(404).json({ errors: [{ msg: 'note not found' }] });
		}

		course = await Course.findByIdAndUpdate(
			req.params.course_id,
			{ $pull: { 'studyMaterial.notes': { _id: req.params.notes_id } } },
			{ new: true }
		);

		if (!course) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		await SubmissionStream().delete(notes.documentId, (err, result) => {
			if (err) {
				return res.status(404).json({
					errors: [{ msg: err }]
				});
			}
		});

		res.status(200).json({ msg: 'study material delted', course });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		PUT: api/courses/project/:course_id
// @desc		Add project to course
// @access		Private
router.put(
	'/project/:course_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('documentId', 'document is required').not().isEmpty(),
			check('deadline', 'deadline is required').not().isEmpty(),
			check('maxMarks', 'maxMarks is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, documentId, deadline, maxMarks } = req.body;

		try {
			let course = await Course.findById(req.params.course_id);
			if (!course) {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{
					$set: {
						project: {
							_id: new mongoose.Types.ObjectId(),
							title,
							deadline,
							documentId,
							maxMarks
						}
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'project created', course });
		} catch (err) {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/project/:course_id/update
// @desc		Update project
// @access		Private
router.put(
	'/project/:course_id/update',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('deadline', 'deadline is required').not().isEmpty(),
			check('maxMarks', 'maxMarks is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, deadline, maxMarks } = req.body;

		try {
			const course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{
					$set: {
						'project.title': title,
						'project.deadline': deadline,
						'project.maxMarks': maxMarks
					}
				},
				{ new: true }
			);

			res.status(200).json({ msg: 'project updated', course });
		} catch (err) {
			console.log(err);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/courses/project/:course_id/:project_id/:document_id
// @desc		Update project doc
// @access		Private
router.put(
	'/project/:course_id/:project_id/:document_id',
	[auth, [check('documentId', 'document is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { documentId } = req.body;

		try {
			const course = await Course.findByIdAndUpdate(
				req.params.course_id,
				{
					$set: {
						'project.documentId': documentId
					}
				},
				{ new: true }
			);

			await SubmissionStream().delete(
				mongoose.Types.ObjectId(req.params.document_id),
				(err, result) => {
					if (err) {
						return res.status(404).json({
							errors: [{ msg: err }]
						});
					}
				}
			);

			res.status(201).json({ msg: 'project document updated', course });
		} catch (err) {
			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		DELETE: api/courses/project/:course_id
// @desc		Remove project from course
// @access		Private
router.delete('/project/:course_id', auth, async (req, res) => {
	try {
		let course = await Course.findOne({
			_id: req.params.course_id,
			instructor: req.account.id
		});

		if (!course) {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		await SubmissionStream().delete(course.project.documentId, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(404).json({
					errors: [{ msg: err }]
				});
			}
		});

		course = await Course.findOneAndUpdate(
			{
				_id: req.params.course_id,
				instructor: req.account.id,
				'project._id': { $exists: true }
			},
			{ $set: { project: {} } },
			{ new: true }
		);

		await Performance.updateMany(
			{ performance: { $elemMatch: { course: req.params.course_id } } },
			{
				$set: {
					'performance.$.project': {}
				}
			},
			{ new: true }
		);

		res.status(200).json({ msg: 'project removed', course });
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});
module.exports = router;
