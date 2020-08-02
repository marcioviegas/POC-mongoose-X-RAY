import Application from './app';
import AWSXRay from 'aws-xray-sdk-core';
import fetch from 'node-fetch';

let segment;
let app;
let ns;
let xRayContext;

beforeAll((done) => {
	app = Application();
	app.listen(done);
});

afterAll((done) => {
	app.stop(done);
});

beforeEach(function () {
	segment = new AWSXRay.Segment('mongoose-xray-test');

	ns = AWSXRay.getNamespace();
	xRayContext = ns.createContext();
	ns.enter(xRayContext);
	AWSXRay.setSegment(segment);
});

afterEach(function () {
	segment.close();
	ns.exit(xRayContext);
});

test('x-ray-on-express', async () => {
	const addSubsegmentSpy = jest.spyOn(segment, 'addNewSubsegment');
    
	const res = await fetch('http://localhost:3000').then(res => res.json());
    
	expect(res._id).toBeDefined();
    
	expect(addSubsegmentSpy).toHaveBeenCalledTimes(1);

});