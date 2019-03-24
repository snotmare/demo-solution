import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service';
import { Observable } from 'rxjs';
import { Weather } from 'shared';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
	weather$: Observable<Weather>;

	constructor(private weatherService: WeatherService) { }

	ngOnInit() {
		this.weather$ = this.weatherService.getLocation();
	}
}
