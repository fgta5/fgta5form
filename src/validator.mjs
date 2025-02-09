export function doValidation(el, validator) {
	console.log('validation....')
	var validator = el.getAttribute('validator')
	var value = el.value

	console.log(validator)

	return true
}