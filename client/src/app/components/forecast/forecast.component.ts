import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from 'shared';

@Component({
	selector: 'app-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
	@Input() forecast: Forecast;

	constructor() { }

	ngOnInit() {
	}
}
