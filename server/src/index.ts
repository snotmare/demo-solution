import { Test } from './test';

foo('hi');

function foo(value: string) {
	new Test();
	console.log(value);
}