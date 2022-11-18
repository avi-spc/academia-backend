const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
	course: {
		type: mongoose.Schema.Types.ObjectId
	},
	announcements: [
		{
			type: new mongoose.Schema(
				{
					title: {
						type: String,
						required: true
					},
					message: {
						type: String,
						required: true
					}
				},
				{ timestamps: true }
			)
		}
	]
});

module.exports = Announcement = mongoose.model('announcement', AnnouncementSchema);
