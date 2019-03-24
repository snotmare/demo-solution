import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service';
import { Observable } from 'rxjs';
import { Weather } from 'shared';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
	@Input() weather: Weather;

	constructor() { }

	ngOnInit() {
		
	}
}
