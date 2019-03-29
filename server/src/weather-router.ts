import * as bodyParser from 'body-parser';
import { Express, Request, Response } from 'express';
import { StringUtils, WeatherSearch, ObjectUtils } from 'shared';
import * as weather from 'weather-js';

export class WeatherRouter {
	cache: Cache;

	constructor(app: Express) {
		this.cache = new Cache();
		this.cache.items = [];
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

		if (search.degreeType !== 'F' && search.degreeType !== 'C') {
			throw new Error('Degree Type is invalid.');
		}

		let cityState = search.city + ', ' + search.state;

		let instance = this;
		let cachedResult = this.getCache(search);
		if (!ObjectUtils.isEmpty(cachedResult)) {
			return response.json(cachedResult).send;
		}
		
		// TODO Feel free to promisify. Then use if else and response.json one time, and get rid of instance var.
		weather.find({search: cityState, degreeType: degType}, function(err: Error, result: any) {
			if(err) {
				console.log(err);
				response.send('There was a problem getting the weather.');
			} else {
				result[0].forecast.forEach((day: any) => {
					day.imageUrl = result[0].location.imagerelativeurl + 'law/' + day.skycodeday + '.gif';
				});
				response.json(result[0]).send;
				instance.updateCache(search, result[0]);
			}
		});
	}

	private getCache(search: WeatherSearch): any {
		for (let i = 0; i < this.cache.items.length; i++) {
			const cacheItem = this.cache.items[i];
			if (cacheItem.search.city === search.city
			&& cacheItem.search.state === search.state
			&& cacheItem.search.degreeType === search.degreeType) {
				if (Date.now() - cacheItem.lastUpdated >= 60000) {
					// item is atleast a minute old, need to retrieve it again
					return undefined;
				}
				return cacheItem.result;
			}
		}
		return undefined;
	}

	private updateCache(search: WeatherSearch, result: any) {
		// TODO come up with a better way to loop? Loop the same way in getCache() or better yet create cacheFind()
		for (let i = 0; i < this.cache.items.length; i++) {
			const cacheItem = this.cache.items[i];
			if (cacheItem.search.city === search.city
			&& cacheItem.search.state === search.state
			&& cacheItem.search.degreeType === search.degreeType) {
				cacheItem.result = result;
				cacheItem.lastUpdated = Date.now();
				return;
			}
		}

		let item = new CacheItem();
		item.search = search;
		item.result = result;
		item.lastUpdated = Date.now();
		this.cache.items.push(item);
	}
}

// TODO May move these to their own files in server directory
class Cache {
	items: CacheItem[];
}

class CacheItem {
	search: WeatherSearch;
	result: any;
	lastUpdated: number;
}