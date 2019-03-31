import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Weather, WeatherSearch } from 'shared';

@Injectable()
export class WeatherService {
	constructor(private http: HttpClient) {

	}

	getLocation(search: WeatherSearch): Observable<Weather> {
		let options = {
			
		};

		return this.http.post('http://localhost:3000/weather', search, options)
			.pipe(
				catchError(error => {
					console.log(error.error);
					return empty();
				})
			) as Observable<Weather>;
	}
}