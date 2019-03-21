import { Express, Request, Response } from 'express';
import { ObjectUtils } from 'shared';
// import * as weather from 'weather-js';

export class WeatherRouter {
	constructor(app: Express) {
		app.get('/weather', (request: Request, response: Response) => {
			
			response.send('Getting weather ' + ObjectUtils.isEmpty(undefined));
		});
	}
}


// async function main(req, res) {
// 	try{
// 		respondWeather(req, res);
// 	} catch(err){
// 		respondErr(err, res);
// 	}
// }

// function respondWeather(req: express.Request, res: express.Response) {
// 	if(req.query.city == null || req.query.city === ''){
// 		throw new Error('city is required');
// 	}

// 	if(req.query.state == null || req.query.state === ''){
// 		throw new Error('state is required');
// 	}

// 	let cityState: string = req.query.city + ', ' + req.query.state;

// 	let temperature: number = 10;

// 	weather.find({search: cityState, degreeType: 'F'}, function(err, result) {
// 		if(err) {
// 			console.log(err);
// 			respondErr(err, res);
// 		}
// 		temperature = Number(result[0].current.temperature);
// 		res.send('The temp in ' + cityState + ' is ' + temperature + '.');
// 	});
// }

// function respondErr(err: Error, res){

// 	res.send('There was a problem ' + err.message);	
// }