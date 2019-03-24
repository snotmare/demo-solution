import { ObjectUtils } from "./object-utils";

export class StringUtils {
	static isEmpty(value: string): boolean {
		return ObjectUtils.isEmpty(value)
			|| value.trim.length === 0;
	}

	static isNotEmpty(value: string): boolean {
		return !StringUtils.isEmpty(value);
	}
}