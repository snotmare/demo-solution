import * as express from 'express';
import { WeatherRouter } from './weather-router';

let app = express();

app.get('/', function (request: express.Request, response: express.Response) {
	response.send('Hello World!');
});

new WeatherRouter(app);

app.listen(3000, () => {
	console.log('Magic happens on port 3000!');
});
