import express from 'express';
import mongoose from 'mongoose';
import mongooseXray from 'mongoose-xray';

const Application = function () {
	const app = express();
	let server;

	const SERVER_PORT = process.env.SERVER_PORT || 3000;
	const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/xraytest?authSource=admin';
	
	let TestSchema = new mongoose.Schema({},  {strict: false});
	
	// The plugin works when attached to specifics Schemas, but not globally
	// TestSchema.plugin(mongooseXray, {verbose: true});

	let TestModel = mongoose.model('test', TestSchema);

	// I could await, but mongo is always faster than server.listen - KISS
	mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, auth: false}).then(() => {
		console.log(`MongoDB connected on URI: ${MONGO_URI}`);
	});

	mongoose.plugin(mongooseXray, {verbose: true});

	app.get('/', async (req, res) => {
		return await new TestModel({}).save().then((r) => {
			res.send(r);
		});
	});

	return {
		listen: (callback) => server = app.listen(SERVER_PORT, callback),
		stop: (callback) => server.close(() => {
			mongoose.connection.close().then(() => {
				callback();
			});
		})
	};
};

export default Application;

if(process.env.ENV !== 'TEST')
	Application().listen(() => console.log('Server running'));