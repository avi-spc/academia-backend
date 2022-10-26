const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
	{
		code: {
			type: Number,
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
			type: mongoose.Schema.Types.ObjectId
		},
		studyMaterial: {
			notes: [
				{
					title: {
						type: String
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
			}
		],
		project: {
			title: {
				type: mongoose.Schema.Types.ObjectId
			},
			requirements: [
				{
					type: mongoose.Schema.Types.String
				}
			],
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
