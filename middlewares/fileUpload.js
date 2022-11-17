const path = require('path');
const crypto = require('crypto');

const config = require('config');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
	url: process.env.MONGO_URI || config.get('mongoURI'),
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}

				const filename = buf.toString('hex') + path.extname(file.originalname);
				const bucketName = 'submission';

				const fileInfo = {
					filename,
					bucketName
				};

				resolve(fileInfo);
			});
		});
	}
});

const upload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		if (!isFileTypeAllowed(file)) {
			callback(new Error('only zip & pdf are allowed'), false);
		} else {
			callback(null, true);
		}
	}
}).single('file');

const isFileTypeAllowed = (file) => {
	const allowedFileTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];

	return allowedFileTypes.includes(file.mimetype);
};

const fileUploadHandler = (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(422).json({ errors: [{ msg: err.message }] });
		}

		next();
	});
};

module.exports = fileUploadHandler;
