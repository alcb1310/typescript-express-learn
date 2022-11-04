const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
port = process.env.PORT || 5000;

app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
