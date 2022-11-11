const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');

const auth = require('../../middlewares/auth');
const fileUploadHandler = require('../../middlewares/fileUpload');
const { SubmissionStream } = require('../../config/db');

const Course = require('../../models/Course');
const Student = require('../../models/Student');
const Performance = require('../../models/Performance');

const router = express.Router();

// @route		POST: api/performance/:course_id
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
			const course = await Course.findOne({ accessCode: courseAccessCode });
			if (!course) {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			const student = await Student.findByIdAndUpdate(
				req.account.id,
				{ $push: { coursesEnrolled: { course: course._id } } },
				{ new: true }
			).populate('coursesEnrolled.course');

			await Performance.findOneAndUpdate(
				{ student: req.account.id },
				{ $push: { performance: { course: course._id } } },
				{ new: true }
			);

			res.status(201).json({
				msg: 'enrolled course',
				account: student,
				type: 'student'
			});
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		DELETE: api/performance/:course_id
// @desc		Unenroll a course
// @access		Private
router.delete('/:course_id', auth, async (req, res) => {
	try {
		const student = await Performance.findOneAndUpdate(
			{ student: req.account.id },
			{ $pull: { performance: { course: req.params.course_id } } },
			{ new: true }
		);

		await Student.findByIdAndUpdate(
			req.account.id,
			{ $pull: { coursesEnrolled: { course: req.params.course_id } } },
			{ new: true }
		);

		await Performance.findOneAndUpdate(
			{
				student: { $ne: req.account.id },
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.team': { $elemMatch: { student: req.account.id } }
					}
				}
			},
			{
				$set: { 'performance.$.project.isTeamLeader': true }
			},
			{ new: true }
		);

		await Performance.updateMany(
			{
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.team': { $elemMatch: { student: req.account.id } }
					}
				}
			},
			{
				$pull: {
					'performance.$.project.team': { student: req.account.id }
				}
			},
			{ new: true, multi: true }
		);

		res.status(200).json({ msg: 'unenrolled course', student });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: api/performance/student
// @desc		Retrieve performace for loggedIn student
// @access		Private
router.get('/student', auth, async (req, res) => {
	try {
		const studentPerformance = await Performance.findOne({
			student: req.account.id
		}).populate('performance.course');

		res.status(200).json({ studentPerformance });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'student not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: api/performance/student/:student_id
// @desc		Retrieve performace for a particular student
// @access		Private
router.get('/student/:student_id', auth, async (req, res) => {
	try {
		const studentPerformance = await Performance.findOne({
			student: req.params.student_id
		})
			.populate('performance.course')
			.populate('student');

		res.status(200).json({ studentPerformance });
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'student not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		GET: api/performance/assignment/:assignment_id
// @desc		Retrieve all students who have submitted a particular assignment
// @access		Private
router.get('/assignment/:assignment_id', auth, async (req, res) => {
	try {
		const studentsSubmitted = await Performance.find({
			'performance.assignments.id': req.params.assignment_id
		}).populate('student');

		res.status(200).json({ studentsSubmitted });
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ errors: [{ msg: 'assignment not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/performance/assignment/:course_id/:assignment_id
// @desc		Submit an assignment
// @access		Private
router.post(
	'/assignment/:course_id/:assignment_id',
	[auth, [check('documentId', 'document is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { documentId } = req.body;

		try {
			const course = await Course.findById(req.params.course_id);

			const assignment = course.assignments.find((assignment) => {
				return assignment._id.toString() === req.params.assignment_id;
			});

			if (!(new Date(assignment.deadline) > Date.now())) {
				return res.status(400).json({ errors: [{ msg: "can't submit past deadline" }] });
			}

			const performance = await Performance.findOneAndUpdate(
				{
					student: req.account.id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$push: {
						'performance.$.assignments': { id: req.params.assignment_id, documentId }
					}
				},
				{ new: true }
			).populate('performance.course');

			res.status(201).json({ msg: 'submitted assignment', performance });
		} catch (err) {
			console.log(err);
			if (err.kind === 'ObjectId' && err.path === 'assignments') {
				return res.status(404).json({ errors: [{ msg: 'assignment not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		DELETE: api/performance/assignment/:course_id/:assignment_id
// @desc		Unsubmit an assignment
// @access		Private
router.delete('/assignment/:course_id/:assignment_id/:document_id', auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.course_id);

		const assignment = course.assignments.find((assignment) => {
			return assignment._id.toString() === req.params.assignment_id;
		});

		if (!(new Date(assignment.deadline) > Date.now())) {
			return res.status(400).json({ errors: [{ msg: "can't withdraw past deadline" }] });
		}

		const performance = await Performance.findOneAndUpdate(
			{
				student: req.account.id,
				performance: { $elemMatch: { course: req.params.course_id } }
			},
			{
				$pull: {
					'performance.$.assignments': {
						$and: [
							{ id: req.params.assignment_id },
							{ marksObtained: { $exists: false } }
						]
					}
				}
			},
			{ new: true }
		).populate('performance.course');

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

		res.status(200).json({ msg: 'unsubmitted assignment', performance });
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

// @route		PUT: api/performance/assignment/:student_id/:course_id/:assignment_id
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
					student: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.assignments.$[assignment].marksObtained': marks
					}
				},
				queryOptions
			).populate('performance.course');

			res.status(201).json({ msg: 'assignment graded', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'student') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/performance/assignment/remark/:student_id/:course_id/:assignment_id
// @desc		Add remarks for an assignment
// @access		Private
router.put(
	'/assignment/remark/:student_id/:course_id/:assignment_id',
	[auth, [check('remarks', 'remarks is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { remarks } = req.body;

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
					student: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.assignments.$[assignment].remarks': remarks
					}
				},
				queryOptions
			);

			res.status(201).json({ msg: 'remark added for assignment', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'student') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		GET: api/performance/project
// @desc		Retrieve all students who have submitted the course project
// @access		Private
router.get('/project/:project_id', auth, async (req, res) => {
	try {
		const studentsSubmitted = await Performance.find({
			'performance.project.id': req.params.project_id
		}).populate('student');

		res.status(200).json({ studentsSubmitted });
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		POST: api/performance/project/:course_id/:project_id
// @desc		Submit project details
// @access		Private
router.post(
	'/project/:course_id/:project_id',
	[
		auth,
		[
			check('title', 'title is required').not().isEmpty(),
			check('documentId', 'document is required').not().isEmpty(),
			check('synopsis', 'synopsis is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { title, synopsis, documentId } = req.body;

		try {
			const course = await Course.findById(req.params.course_id);

			if (!(new Date(course.project.deadline) > Date.now())) {
				return res.status(400).json({ errors: [{ msg: "can't submit past deadline" }] });
			}

			const performance = await Performance.findOneAndUpdate(
				{
					student: req.account.id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.project': {
							id: req.params.project_id,
							title,
							synopsis,
							documentId,
							isTeamLeader: true,
							team: [{ student: req.account.id }]
						}
					}
				},
				{ new: true }
			).populate('performance.course');

			res.status(201).json({ msg: 'submitted project', performance });
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

// @route		DELETE: api/performance/project/:course_id/:project_id
// @desc		Unsubmit project details
// @access		Private
router.delete('/project/:course_id/:document_id', auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.course_id);

		if (!(new Date(course.project.deadline) > Date.now())) {
			return res.status(400).json({ errors: [{ msg: "can't withdraw past deadline" }] });
		}

		const teamLeader = await Performance.findOneAndUpdate(
			{
				student: req.account.id,
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.marksObtained': { $exists: false },
						'project.isTeamLeader': true
					}
				}
			},
			{
				$set: { 'performance.$.project': {} }
			},
			{ new: true }
		).populate('performance.course');

		if (!teamLeader) {
			return res.status(403).json({ errors: [{ msg: 'forbidden' }] });
		}

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

		await Performance.updateMany(
			{
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.team': { $elemMatch: { student: req.account.id } }
					}
				}
			},
			{
				$set: { 'performance.$.project': {} }
			},
			{ new: true, multi: true }
		);

		res.status(200).json({ msg: 'unsubmitted project', teamLeader });
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId' && err.path === 'course') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		if (err.kind === 'ObjectId' && err.path === 'project') {
			return res.status(404).json({ errors: [{ msg: 'project not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		PUT: api/performance/project/:course_id
// @desc		Add project team member
// @access		Private
router.put('/projectTeam/:course_id/:member_id', auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.course_id);

		if (!(new Date(course.project.deadline) > Date.now())) {
			return res
				.status(400)
				.json({ errors: [{ msg: "can't add team member past deadline" }] });
		}

		const teamLeader = await Performance.findOneAndUpdate(
			{
				student: req.account.id,
				performance: {
					$elemMatch: { course: req.params.course_id, 'project.isTeamLeader': true }
				}
			},
			{
				$addToSet: {
					'performance.$.project.team': { student: req.params.member_id }
				}
			},
			{ new: true }
		).populate('performance.course');
		if (!teamLeader) {
			return res.status(403).json({ errors: [{ msg: 'allowed only by team leader' }] });
		}

		await Performance.updateMany(
			{
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.team': { $elemMatch: { student: req.account.id } }
					}
				}
			},
			{
				$addToSet: {
					'performance.$.project.team': { student: req.params.member_id }
				}
			},
			{ new: true, multi: true }
		);

		const teamLeaderProjectPerformance =
			teamLeader.performance[
				teamLeader.performance.findIndex(
					(perf) => perf.course._id.toString() === req.params.course_id
				)
			].project;

		teamLeaderProjectPerformance.isTeamLeader = false;

		await Performance.findOneAndUpdate(
			{
				student: req.params.member_id,
				performance: { $elemMatch: { course: req.params.course_id } }
			},
			{
				$set: {
					'performance.$.project': teamLeaderProjectPerformance
				}
			},
			{ new: true }
		);

		res.status(201).json({ msg: 'team member added', performance: teamLeader });
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId' && err.path === 'course') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		DELETE: api/performance/project/:course_id/:member_id
// @desc		Remove project team member
// @access		Private
router.delete('/projectTeam/:course_id/:member_id', auth, async (req, res) => {
	try {
		const course = await Course.findById(req.params.course_id);

		if (!(new Date(course.project.deadline) > Date.now())) {
			return res
				.status(400)
				.json({ errors: [{ msg: "can't remove team member past deadline" }] });
		}

		const teamLeader = await Performance.findOneAndUpdate(
			{
				student: req.account.id,
				performance: {
					$elemMatch: { course: req.params.course_id, 'project.isTeamLeader': true }
				}
			},
			{
				$pull: {
					'performance.$.project.team': { student: req.params.member_id }
				}
			},
			{ new: true }
		).populate('performance.course');

		if (!teamLeader) {
			return res.status(403).json({ errors: [{ msg: 'allowed only by team leader' }] });
		}

		await Performance.updateMany(
			{
				performance: {
					$elemMatch: {
						course: req.params.course_id,
						'project.team': { $elemMatch: { student: req.account.id } }
					}
				}
			},
			{
				$pull: {
					'performance.$.project.team': { student: req.params.member_id }
				}
			},
			{ new: true, multi: true }
		);

		await Performance.findOneAndUpdate(
			{
				student: req.params.member_id,
				performance: {
					$elemMatch: { course: req.params.course_id }
				}
			},
			{
				$set: {
					'performance.$.project': {}
				}
			},
			{ new: true }
		);

		res.status(200).json({ msg: 'team member removed', performance: teamLeader });
	} catch (err) {
		if (err.kind === 'ObjectId' && err.path === 'course') {
			return res.status(404).json({ errors: [{ msg: 'course not found' }] });
		}

		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

// @route		PUT: api/performance/project/:student_id/:course_id
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
					student: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.project.marksObtained': marks
					}
				},
				{ new: true }
			).populate('performance.course');

			res.status(201).json({ msg: 'project graded', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'student') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		PUT: api/performance/project/remark/:student_id/:course_id
// @desc		Add remarks for a project
// @access		Private
router.put(
	'/project/remark/:student_id/:course_id',
	[auth, [check('remarks', 'remarks is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { remarks } = req.body;

		try {
			const performance = await Performance.findOneAndUpdate(
				{
					student: req.params.student_id,
					performance: { $elemMatch: { course: req.params.course_id } }
				},
				{
					$set: {
						'performance.$.project.remarks': remarks
					}
				},
				{ new: true }
			);

			res.status(201).json({ msg: 'project graded', performance });
		} catch (err) {
			if (err.kind === 'ObjectId' && err.path === 'student') {
				return res.status(404).json({ errors: [{ msg: 'student not found' }] });
			}

			if (err.kind === 'ObjectId' && err.path === 'course') {
				return res.status(404).json({ errors: [{ msg: 'course not found' }] });
			}

			res.status(500).json({ errors: [{ msg: 'server error' }] });
		}
	}
);

// @route		POST: api/performance/submissions/file
// @desc		Upload file
// @access		Private
router.post('/submissions/file', [auth, fileUploadHandler], async (req, res) => {
	try {
		if (!req.file) {
			return res.status(422).json({ errors: [{ msg: 'file is required' }] });
		}

		res.status(200).json({ documentId: req.file.id });
	} catch (err) {
		res.status(500).json({
			errors: [{ msg: err }]
		});
	}
});

// @route		DELETE: api/performance/submissions/file
// @desc		Delete document file
// @access		Private
router.delete('/submissions/file/:document_id', auth, async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.document_id)) {
		return res.status(404).json({ errors: [{ msg: 'document not found' }] });
	}

	try {
		await SubmissionStream().delete(
			mongoose.Types.ObjectId(req.params.document_id),
			(err, result) => {
				if (err) {
					return res.status(404).json({ errors: [{ msg: 'document not found' }] });
				}

				res.status(200).json({ msg: 'document discarded' });
			}
		);
	} catch (err) {
		res.status(500).json({ errors: [{ msg: 'server error' }] });
	}
});

router.get('/submissions/file/:file_id', async (req, res) => {
	try {
		const files = await SubmissionStream()
			.find({ _id: mongoose.Types.ObjectId(req.params.file_id) })
			.toArray();

		const stream = SubmissionStream().openDownloadStreamByName(files[0].filename);

		stream.pipe(res);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			errors: [{ msg: err }]
		});
	}
});

module.exports = router;
