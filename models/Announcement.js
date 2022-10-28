const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId
	},
	announcements: [
		{
			title: {
				type: String,
				required: true
			},
			message: {
				type: String,
				required: true
			}
		}
	]
});

module.exports = Announcement = mongoose.model('announcement', AnnouncementSchema);
