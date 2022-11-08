const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId
		},
		marksObtained: {
			type: Number
		},

		remarks: {
			type: String
		},
		_id: false
	},
	{ timestamps: true }
);
const projectSchema = new mongoose.Schema(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId
		},
		title: {
			type: String
		},
		synopsis: {
			type: String
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId
		},
		url: {
			type: String
		},
		team: [
			{
				student: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'student'
				},
				_id: false
			}
		],
		isTeamLeader: {
			type: Boolean,
			default: false
		},
		marksObtained: {
			type: Number
		},
		remarks: {
			type: String
		},
		_id: false
	},
	{ timestamps: true }
);

const PerformanceSchema = new mongoose.Schema(
	{
		student: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'student',
			required: true
		},
		performance: [
			{
				course: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'course'
				},
				assignments: [{ type: assignmentSchema }],
				project: { type: projectSchema }
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = Performance = mongoose.model('performance', PerformanceSchema);
