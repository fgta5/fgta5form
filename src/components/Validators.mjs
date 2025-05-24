export function parseFunctionParam(paramString) {
	const [fnName, ...fnParams] = paramString.split(":");
	const fnParamsString = fnParams.length > 0 ? fnParams.join(":") : null;
	
	return {
		fnName,
		fnParams: fnParamsString !== null 
			? (!isNaN(fnParamsString) ? Number(fnParamsString) : fnParamsString) 
			: null
	};
}


export function required(value) {
	if (value === null || value === undefined || value === '') {
		return false;		
	}
	return true;
}

export function minlength(value, minLength) {
	if (minLength == null || minLength === 0) {
		return true; // no minimum length specified, so always valid
	}
	if (value == null || value.length < minLength) {
		return false; // value is too short
	}
	return true; // value meets the minimum length requirement
}

export function maxlength(value, maxLength) {
	if (maxLength == null || maxLength === 0) {
		return true; // no maximum length specified, so always valid
	}
	if (value == null || value.length > maxLength) {
		return false; // value is too long
	}
	return true; // value meets the maximum length requirement
}

export function pattern(value, strpattern) {
	return true; // TODO: implement pattern validation
}

export function email(value, minLength) {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}