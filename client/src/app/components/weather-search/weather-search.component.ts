import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather-service';
import { Weather, WeatherSearch, Degree, State, DataUtils } from 'shared';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-weather-search',
	templateUrl: './weather-search.component.html',
	styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
	weather: Weather;
	form: FormGroup;

	constructor(private weatherService: WeatherService) {
		this.form = new FormGroup({
			'city': new FormControl(undefined, [Validators.required]),
			'state': new FormControl(undefined, [Validators.required])
		});
	}

	ngOnInit() {
		let search: WeatherSearch = {
			city: 'Lincoln',
			state: 'NE',
			degreeType: Degree.FAHRENHEIT
		};

		this.form.reset(search);
		this.search();
	}

	onSubmit() {
		this.search();
	}

	get states(): State[] {
		return DataUtils.states;
	}
	
	private async search() {
		if(this.form.invalid) {
			return;
		}

		let search = <WeatherSearch>this.form.value;
		search.degreeType = Degree.FAHRENHEIT

		this.weather = await this.weatherService.getLocation(search).toPromise();
	}
}
