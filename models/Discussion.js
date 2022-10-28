const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId
	},
	discussions: [
		{
			createdBy: {
				student: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'student'
				}
			},
			issue: {
				type: String,
				required: true
			},
			reference: {
				id: {
					type: mongoose.Schema.Types.ObjectId
				},
				category: {
					type: String
				}
			},
			comments: [
				{
					student: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'student'
					},
					text: {
						type: String,
						required: true
					}
				}
			]
		}
	]
});

module.exports = Discussion = mongoose.model('discussion', DiscussionSchema);
