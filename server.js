const express = require('express');

const ConnectDB = require('./config/db');

const app = express();

app.use(express.json({ extended: false }));

ConnectDB();

app.get('/', (req, res) => res.send('API running'));

app.use('/api/instructors', require('./routes/api/auth/instructor'));
app.use('/api/courses', require('./routes/api/courses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
