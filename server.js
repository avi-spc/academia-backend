const express = require('express');

const ConnectDB = require('./config/db');

const app = express();

ConnectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
