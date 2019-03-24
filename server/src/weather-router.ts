import { Express, Request, Response } from 'express';
import { ObjectUtils, WeatherSearch, StringUtils } from 'shared';
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
		let search = <WeatherSearch>request.body;

		if (StringUtils.isEmpty(search.city)) {
			throw new Error('City is required.');
		}

		if(StringUtils.isEmpty(search.state)) {
			throw new Error('State is required.');
		}

		let degType: string;

		if(StringUtils.isEmpty(search.degreeType)) {
			throw new Error('Degree Type is required.');
		}

		if (request.body.degreeType !== 'F' && request.body.degreeType !== 'C') {
			throw new Error('Degree Type is invalid.');
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