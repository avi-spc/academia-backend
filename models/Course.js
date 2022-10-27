const mongoose = require('mongoose');

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
					title: {
						type: String,
						required: true
					},
					documentId: {
						type: mongoose.Schema.Types.ObjectId
					}
				}
			],
			references: [
				{
					title: {
						type: String
					},
					documentId: {
						type: mongoose.Schema.Types.ObjectId
					},
					documentLink: {
						type: String
					}
				}
			]
		},
		assignments: [
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
			}
		],
		project: {
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
			}
		}
	},
	{
		timestamps: true
	}
);

module.exports = Course = mongoose.model('course', CourseSchema);
