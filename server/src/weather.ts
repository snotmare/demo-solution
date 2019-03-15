import * as express from 'express';
import * as weather from 'weather-js';
import * as redis from 'redis';

let redisOptions = {
	host: '127.0.0.1',
	port: 6379,
	db: 0				// core
	// db: 1					// wo
};

let app = express();
let cache = redis.createClient(redisOptions);
let requestCount;

cache.on('error', cacheError);

app.get('/', function (req, res) {
	
	main(req, res);

});

async function main(req, res) {

	if (!await existsCache('requestCount')) {
		console.log('adding requestCount')
		await setCache('requestCount', '0');
	}
	console.log('incrementing requestCount')
	await incrCache('requestCount');
	requestCount = await getCache('requestCount');

	console.log(requestCount);

	try{
		respondWeather(req, res);
	} catch(err){
		respondErr(err, res);
	}

}

function respondWeather(req: express.Request, res: express.Response) {

	if(req.query.city == null || req.query.city === ''){
		throw new Error('city is required');
	}

	if(req.query.state == null || req.query.state === ''){
		throw new Error('state is required');
	}

	let cityState: string = req.query.city + ', ' + req.query.state;

	let temperature: number = 10;

	weather.find({search: cityState, degreeType: 'F'}, function(err, result) {
		if(err) {
			console.log(err);
			respondErr(err, res);
		}
		temperature = Number(result[0].current.temperature);
		res.send('The temp in ' + cityState + ' is ' + temperature + '.');
	});
	
}

function respondErr(err: Error, res){

	res.send('There was a problem ' + err.message);	
}

app.listen(3000, function () {
	console.log('Magic happens on port 3000!');
});

async function setCache(key: string, value: string): Promise<any> {
	return new Promise((resolve, reject) => {
		cache.set(key, value, (error, result) => {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});
	});
}

async function getCache(key: string): Promise<any> {
	return new Promise((resolve, reject) => {
		cache.get(key, (error, result) => {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});
	});
}

async function existsCache(key: string): Promise<any> {
	return new Promise((resolve, reject) => {
		cache.exists(key, (error, result) => {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});
	});
}

async function incrCache(key: string): Promise<any> {
	return new Promise((resolve, reject) => {
		cache.incr(key, (error, result) => {
			if (error) {
				return reject(error);
			}
			return resolve(result);
		});
	});
}

function cacheError(error) {
	console.log(`Cache error: ${error.message}`);
}