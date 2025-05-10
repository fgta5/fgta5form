export function customValidation(input, validator) {
	// var validator_list = el.getAttribute('validator')

// if (validator_list===undefined || validator_list===null) {
// 	return true // tidak ada validator, tidak perlu validasi
// }

// var validators = validator_list.split(',')
// for (var validator of validators) {
// 	var fn_name = ""
// 	var fn_param = ""
// 	if (validator.indexOf(':')>0) {

// 	}

// }
}

export function textLengthValidation(text, minlength, maxlength) {
	if (minlength && text.length < minlength) {
		return false
	}

	if (maxlength && text.length > maxlength) {
		return false
	}

	return true
}



// export function doValidation(input, validator) {
// 	console.log('validation....')
// 	var isValid = true

// 	if (input.type=="Textbox") {
// 		isValid &&= doValidation_texbox(input)
// 	} else if (input.type=="Numberbox") {
// 		isValid &&= doValidation_numberbox(input)
// 	} else if (input.type=="Combobox") {
// 		isValid &&= doValidation_combobox(input)
// 	} else if (input.type=="Datebox") {
// 		isValid &&= doValidation_datebox(input)
// 	} else if (input.type=="Timebox") {
// 		isValid &&= doValidation_timebox(input)
// 	}

// 	isValid &&= doCustomValidation(input, validator)
// 	return isValid
// }


// function doValidation_texbox(input) {
// 	// required => value bukan "" atau null
// 	// minlength, maxlength

// 	var required = input.Element.getAttribute('required')
// 	var minlength = input.Element.getAttribute('minlength')
// 	var maxlength = input.Element.getAttribute('maxlength')
// }

// function doValidation_numberbox(input) {
// 	// required => value bukan 0, bukan "", atau null
// 	// minvalue, maxvalue

// 	var required = input.Element.getAttribute('required')
// 	var minvalue = input.Element.getAttribute('minvalue')
// 	var maxvalue = input.Element.getAttribute('maxvalue')
// }

// function doValidation_combobox(input) {
// 	// required => value bukan "" atau null

// 	var required = input.Element.getAttribute('required')
// }

// function doValidation_datebox(input) {
// 	// required => value bukan "" atau null
// 	// mindate, maxdate
// }

// function doValidation_timebox(input) {
// 	// required => value bukan "" atau null
// 	// mintime, maxtime

// }

