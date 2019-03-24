import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Weather } from 'shared';

@Injectable()
export class WeatherService {
	constructor(private http: HttpClient) {

	}

	getLocation(): Observable<Weather> {
		let options = {
			
		};

		let body = {
			city: 'Lincoln',
			state: 'Nebraska',
			degreeType: 'F'
		};

		return this.http.post('http://localhost:3000/weather', body, options)
			.pipe(
				tap(weather => console.log(weather))
			) as Observable<Weather>;
	}
}