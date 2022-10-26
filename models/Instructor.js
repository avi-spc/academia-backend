const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema(
	{
		email: {
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
		age: {
			type: Number
		},
		specialization: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

module.exports = Instructor = mongoose.model('instructor', InstructorSchema);
