const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/auth');

const Student = require('../../models/Student');
const Performance = require('../../models/Performance');

const router = express.Router();

// @route		POST: /api/performance/:course_id
// @desc		Enroll into a course
// @access		Private
router.post(
	'/:course_id',
	[auth, [check('courseAccessCode', 'access code is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { courseAccessCode } = req.body;

		try {
			if (courseAccessCode !== 'abcde') {
				return res.status(400).json({ errors: [{ msg: 'invalid access code' }] });
			}

			const student = await Student.findByIdAndUpdate(
				req.account.id,
				{ $push: { coursesEnrolled: req.params.course_id } },
				{ new: true }
			);

			await Performance.findOneAndUpdate(
				{ studentId: req.account.id },
				{ $push: { performance: { course: req.params.course_id } } },
				{ new: true }
			);

			res.status(201).json({ msg: 'enrolled course', student });
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		GET: /api/performance/:assignment_id
// @desc		Retrieve all students who have submitted a particular assignment
// @access		Private
router.get('/assignment/:assignment_id', auth, async (req, res) => {
	try {
		const studentsSubmitted = await Performance.find({
			'performance.assignments.id': req.params.assignment_id
		});

		res.status(200).json({ studentsSubmitted });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'assignment not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: /api/performance/:course_id/:assignment_id
// @desc		Submit an assignment
// @access		Private
router.post('/assignment/:course_id/:assignment_id', auth, async (req, res) => {
	try {
		const performance = await Performance.findOneAndUpdate(
			{
				studentId: req.account.id,
				performance: { $elemMatch: { course: req.params.course_id } }
			},
			{ $push: { 'performance.$.assignments': { id: req.params.assignment_id } } },
			{ new: true }
		);

		res.status(201).json({ msg: 'submitted assignment', performance });
	} catch (err) {
		if (err.kind === 'ObjectId' && err.path === 'assignments') {
			return res.status(404).json({ errors: [{ msg: 'assignment not found' }] });
		}

		if (err.kind === 'ObjectId' && err.path === 'course') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		PUT: /api/performance/:student_id/:course_id/:assignment_id
// @desc		Grade an assignment
// @access		Private
router.put(
	'/assignment/:student_id/:course_id/:assignment_id',
	[auth, [check('marks', 'marks is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { marks } = req.body;

		try {
			const queryOptions = {
				arrayFilters: [
					{
						'assignment.id': req.params.assignment_id
					}
				],
				new: true
			};

			const performance = await Performance.findOneAndUpdate(
				{
					studentId: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.assignments.$[assignment].marksObtained': marks
					}
				},
				queryOptions
			);

			res.status(200).json({ msg: 'assignment graded', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'studentId') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: /api/performance/project/:course_id/:project_id
// @desc		Add project details
// @access		Private
router.post(
	'/project/:course_id/:project_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('synopsis', 'synopsis is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, synopsis } = req.body;

		try {
			const performance = await Performance.findOneAndUpdate(
				{
					studentId: req.account.id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.project': { id: req.params.project_id, title, synopsis }
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'project submitted', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'project') {
				return res.status(404).json({ errors: [{ msg: 'project not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: /api/performance/project/:course_id
// @desc		Add project team member
// @access		Private
router.put(
	'/project/:course_id',
	[auth, [check('teamMember', 'team member is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { teamMember } = req.body;

		try {
			const performance = await Performance.findOneAndUpdate(
				{
					studentId: req.account.id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$addToSet: {
						'performance.$.project.team': { student: teamMember }
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'team member added', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: /api/performance/project/:student_id/:course_id
// @desc		Grade a project
// @access		Private
router.put(
	'/project/:student_id/:course_id',
	[auth, [check('marks', 'marks is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { marks } = req.body;

		try {
			const performance = await Performance.findOneAndUpdate(
				{
					studentId: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.project.marksObtained': marks
					}
				},
				{ new: true }
			);

			res.status(200).json({ msg: 'project graded', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'studentId') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

module.exports = router;
