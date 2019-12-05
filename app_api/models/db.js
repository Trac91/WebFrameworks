
const mongoose = require ('mongoose');

var options = {
	useMongoClient: true,
	socketTimeoutMS:0,
	keepAlive: true,
	reconnectTries:30
};

const dbURI = 'mongodb://127.0.0.1/Diary';
if(process.env.NODE_ENV === 'production'){
	dbURI=process.env.MONGODB_URI;
};

const readLine = require ('readline');
mongoose.connect(dbURI);
mongoose.connect(dbURI, options);

if(process.platform ==='win32'){
	const rl = readLine.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on('SIGINT',() => {
		process.emit("SIGINT");
	});
	rl.on('SIGUSR2',() =>{
		process.emit("SIGUSR2.");
		})
	rl.on('SIGTERM',() => {
		process.emit ("SIGTERM");
	});
}


mongoose.connection.on('connected',() => {
	console.log('Mongoose connected to ${dbURI}');
});
mongoose.connection.on('error', err => {
	console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected',() => {
	console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() =>{
		console.log('Mongoose disconnected through ${msg}');
		callback();
	});
};
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid,'SIGUSR2');
	});
});
process.on('SIGINT', () =>{
	gracefulShutdown('app termination', () => {
		process.exit(0);
	});
});

process.on('SIGTERM', () =>{
	gracefulShutdown('Heroku app shutdown', () => {
		process.exit(0);
	});
});

require ('./contacts');
