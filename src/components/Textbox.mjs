import Input from "./Input.mjs"
import { customValidation, textLengthValidation } from "../validator.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
	}


	SetEditingMode(editingmode) {
		Textbox_SetEditingMode(this, editingmode)
	}

	SetError(msg) {
		Textbox_SetError(this, msg)
	}

	Validate() {
		return Textbox_Validate(this)
	}

}

function Textbox_construct(self, id) {
	const el = self.Element
	const elContainer =document.createElement('div')
	const wrap = document.createElement("div")
	const lbl = document.querySelector(`label[for="${self.Id}"]`)

	self.Wrapper = wrap
	self.Label = lbl

	el.classList.add('fgta5-textbox')
	el.parentNode.insertBefore(wrap, el)

	// Pindahkan input ke dalam div
	wrap.appendChild(el);
	wrap.classList.add('fgta5-wrapper-textbox')	

	// masukkan text wrapper ke dalam container
	wrap.parentNode.insertBefore(elContainer, wrap)
	elContainer.appendChild(wrap)
	elContainer.classList.add('fgta5-input-container')

	// Default Event
	el.addEventListener('change', (event) => {
		var isValid = self.Validate()
		if (!isValid) {
			event.stopImmediatePropagation();
		}
	});
	
}

function Textbox_SetEditingMode(self, editingmode) {
	const el = self.Element
	const wrap = self.Wrapper

	self.EditingMode = editingmode
	// if (el.disabled) {
	// 	return
	// }
	console.log('textbox set editing mode: ', editingmode)
	if (editingmode) {
		el.classList.add('fgta5-input-editmode')
		el.readOnly = false
		wrap.removeAttribute('readonly')
	} else {
		el.classList.remove('fgta5-input-editmode')
		el.readOnly = true
		wrap.setAttribute('readonly', "true")
	}

}

function Textbox_SetError(self, msg) {
	const el = self.Element
	const wrap = self.Wrapper

	var errormessage = msg
	if (msg===undefined) {
		errormessage = el.getAttribute('errormessage') // ambil error dari attribut
	} else if (msg===null) {
		errormessage = null  // errormessage==null berarti tidak ada error
	} 

	if (errormessage) {
		// tampilkan error
		el.setAttribute('error', errormessage)
		el.classList.add('fgta5-input-error')
		wrap.classList.add('fgta5-input-error')

		console.error(errormessage)
		var errmsg = wrap.parentNode.querySelector('.fgta5-errormessage')
		if (!errmsg) {
			errmsg = document.createElement('div')
			errmsg.innerText = errormessage
			errmsg.classList.add('fgta5-errormessage')
			wrap.parentNode.appendChild(errmsg)
		}
	} else {
		// hapus error
		el.setAttribute('error', null)
		el.classList.remove('fgta5-input-error')
		wrap.classList.remove('fgta5-input-error')

		var errmsg = wrap.parentNode.querySelector('.fgta5-errormessage')
		if (errmsg) {
			errmsg.parentNode.removeChild(errmsg)
		}
	}
}

function Textbox_Validate(self) {
	const el = self.Element
	const wrap = self.Wrapper
	const lbl = self.Label


	var minlength = el.getAttribute('minlength')  // minimum panjang input text
	var maxlength = el.getAttribute('maxlength')  // maximum panjang input text
	var validator = el.getAttribute('validator')  // fungsi-fungsi yang akan dipakai untuk validasi, pisahkan dengan koma 
	var invalid = el.getAttribute('invalid')      // ambil pesan error dari attribut
	var isRequired = el.getAttribute('required') != null   // value bukan "" atau null
	var isEmpty = self.Value == null || self.Value == ""    // value "" atau null
	var labeltext = lbl ? lbl.innerText : null

	try {
		if (isRequired && isEmpty) {
			var errormessage = invalid!=null ? invalid : `field ${labeltext} is required`	
			throw new Error(errormessage)
		}

		if (!textLengthValidation(self.Value, minlength, maxlength)) {
			var errormessage = invalid!=null ? invalid : `field ${labeltext} must be at least ${minlength} and maximum ${maxlength} characters long`
			throw new Error(errormessage)
		}

		var errormessage = customValidation(self.Value, validator)
		if (errormessage) {
			throw new Error(errormessage)
		}
		
		self.SetError(null) // hapus pesan error jika ada
		return true
	} catch (e) {
		self.SetError(e.message) // tampilkan pesan error
		return false
	}	
}


