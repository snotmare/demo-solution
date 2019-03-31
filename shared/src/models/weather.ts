import { Current } from './current';
import { Forecast } from './forecast';
import { Location } from './location';

export interface Weather {
	current: Current;
	forecast: Forecast[];
	location: Location;
}