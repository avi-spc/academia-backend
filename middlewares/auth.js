const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

const authenticate = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		res.status(401).json({ errors: [{ msg: 'no token, authorization denied' }] });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.instructor = decoded.instructor;

		next();
	} catch (err) {
		res.status(401).json({ errors: [{ msg: 'invalid token' }] });
	}
};

module.exports = authenticate;
