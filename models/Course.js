const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId
		}
	},
	{ timestamps: true }
);

const assignmentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId
		},
		deadline: {
			type: Date,
			required: true
		},
		maxMarks: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

const projectSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId
		},
		title: {
			type: String
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId
		},
		deadline: {
			type: Date
		},
		maxMarks: {
			type: Number
		}
	},
	{ timestamps: true }
);

const CourseSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true,
			unique: true
		},
		credits: {
			type: Number,
			required: true
		},
		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'instructor'
		},
		studyMaterial: {
			notes: [
				{
					type: noteSchema
				}
			]
		},
		assignments: [
			{
				type: assignmentSchema
			}
		],
		project: {
			type: projectSchema
		}
	},
	{
		timestamps: true
	}
);

module.exports = Course = mongoose.model('course', CourseSchema);
