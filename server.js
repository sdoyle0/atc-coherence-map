const path = require('path')
const express = require('express')
const app = express(),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(DIST_DIR))
app.use(express.static(path.join(DIST_DIR, 'build')));
app.get('*', (req, res) => {
	res.sendFile(HTML_FILE)
});
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`App listening to ${PORT}....`);
});