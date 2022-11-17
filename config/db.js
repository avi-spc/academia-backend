const mongoose = require('mongoose');
const config = require('config');

const ConnectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || config.get('mongoURI'));
		console.log('Connected to Database');
	} catch (err) {
		console.log(err.message);
	}
};

let bucketSubmission;

mongoose.connection.once('open', () => {
	bucketSubmission = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
		bucketName: 'submission'
	});
});

const SubmissionStream = () => {
	return bucketSubmission;
};

module.exports = { ConnectDB, SubmissionStream };
