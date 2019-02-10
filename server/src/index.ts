import { Test } from './test';

foo('hi2');

function foo(value: string) {
	new Test();
	console.log(value);
}