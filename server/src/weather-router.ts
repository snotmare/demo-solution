import { Express, Request, Response } from 'express';
import { ObjectUtils } from 'shared';
import * as weather from 'weather-js';
import * as bodyParser from 'body-parser';

export class WeatherRouter {
	constructor(app: Express) {
		app.use(bodyParser.json());

		app.post('/weather', (request: Request, response: Response) => {
			this.getWeather(request, response);
		});
	}

	private getWeather(request: Request, response: Response) {
		if (ObjectUtils.isEmpty(request.body.city) || request.body.city.trim() === '') {
			throw new Error('City is required.');
		}

		if(ObjectUtils.isEmpty(request.body.state) || request.body.state.trim() === '') {
			throw new Error('State is required.');
		}

		let degType: string;
		if(ObjectUtils.isEmpty(request.body.degreeType) || request.body.degreeType.trim() === '') {
			throw new Error('Degree Type is required.');
		} else {
			if (request.body.degreeType !== 'F' && request.body.degreeType !== 'C') {
				throw new Error('Degree Type is invalid.');
			}
		}

		let cityState = request.body.city + ', ' + request.body.state;

		weather.find({search: cityState, degreeType: degType}, function(err: Error, result: any) {
			if(err) {
				console.log(err);
				response.send('There was a problem getting the weather.');
			} else {
				result[0].forecast.forEach((day: any) => {
					day.imageUrl = result[0].location.imagerelativeurl + 'law/' + day.skycodeday + '.gif';
				});
				response.json(result[0]).send;
			}
		});
	}
}