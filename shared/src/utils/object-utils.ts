export class ObjectUtils {
	static isEmpty(value: any) {
		return value === undefined || value === null;
	}

	static isNotEmpty(value: any) {
		return !ObjectUtils.isEmpty(value);
	}
}