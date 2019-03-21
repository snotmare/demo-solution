import * as express from 'express';

let app = express();

app.get('/', function (request: express.Request, response: express.Response) {
	response.send('Hello World!');
	// main(req, res);

});

app.listen(3000, () => {
	console.log('Magic happens on port 3000!');
});
