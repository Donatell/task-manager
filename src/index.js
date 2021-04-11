const app = require('./app.js');

// setup port, heroku or dev port
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => {
	console.log('Server is up on port ' + port);
});