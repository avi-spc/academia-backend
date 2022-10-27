const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
	{
		instituteId: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		branch: {
			type: String
		},
		batch: {
			type: String
		},
		coursesEnrolled: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'course'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = Student = mongoose.model('student', StudentSchema);
