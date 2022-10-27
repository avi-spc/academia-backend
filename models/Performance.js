const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema(
	{
		studentId: {
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
				assignments: [
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
						isSubmitted: {
							type: Boolean
						},
						remarks: {
							type: String
						},
						_id: false
					}
				],
				project: {
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
							studentId: {
								type: mongoose.Schema.Types.ObjectId,
								ref: 'student'
							}
						}
					],
					isSubmitted: {
						type: Boolean
					},
					remarks: {
						type: String
					},
					_id: false
				}
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = Performance = mongoose.model('performance', PerformanceSchema);
