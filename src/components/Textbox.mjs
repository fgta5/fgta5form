import Input from "./Input.mjs"
import { customValidation, textLengthValidation } from "../validator.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
	}

	get value() {
		return this.Element.value
	}

	set value(v) {	
		this.Element.value = v
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
	const elContainer =document.createElement('div')

	self.Wrapper = document.createElement("div")
	self.Element.classList.add('fgta5-textbox')
	self.Label = document.querySelector(`label[for="${self.Id}"]`) // ambil label dari input ini

	self.Element.parentNode.insertBefore(self.Wrapper, self.Element)

	// Pindahkan input ke dalam div
	self.Wrapper.appendChild(self.Element);
	self.Wrapper.classList.add('fgta5-wrapper-textbox')	

	// masukkan text wrapper ke dalam container
	self.Wrapper.parentNode.insertBefore(elContainer, self.Wrapper)
	elContainer.appendChild(self.Wrapper)
	elContainer.classList.add('fgta5-input-container')

	// Default Event
	self.Element.addEventListener('change', (event) => {
		var isValid = self.Validate()
		if (!isValid) {
			event.stopImmediatePropagation();
		}
	});
	
}

function Textbox_SetEditingMode(self, editingmode) {
	self.EditingMode = editingmode

	if (self.Element.disabled) {
		return
	}

	console.log('textbox set editing mode: ', editingmode)
	if (editingmode) {
		self.Element.classList.add('fgta5-input-editmode')
		self.Element.readOnly = false
		self.Wrapper.removeAttribute('readonly')
	} else {
		self.Element.classList.remove('fgta5-input-editmode')
		self.Element.readOnly = true
		self.Wrapper.setAttribute('readonly', "true")
	}

}

function Textbox_SetError(self, msg) {
	var errormessage = msg
	if (msg===undefined) {
		errormessage = self.Element.getAttribute('errormessage') // ambil error dari attribut
	} else if (msg===null) {
		errormessage = null // hapus error
	} 

	if (errormessage) {
		self.Element.classList.add('fgta5-input-error')
		self.Wrapper.classList.add('fgta5-input-error')
	} else {
		self.Element.classList.remove('fgta5-input-error')
		self.Wrapper.classList.remove('fgta5-input-error')
	}
}




function Textbox_Validate(self) {
	var minlength = self.Element.getAttribute('minlength')  // minimum panjang input text
	var maxlength = self.Element.getAttribute('maxlength')  // maximum panjang input text
	var validator = self.Element.getAttribute('validator')  // fungsi-fungsi yang akan dipakai untuk validasi, pisahkan dengan koma 
	var invalid = self.Element.getAttribute('invalid')      // ambil pesan error dari attribut
	var isRequired = self.Element.getAttribute('required') != null   // value bukan "" atau null
	var isEmpty = self.value == null || self.value == ""    // value "" atau null
	var isValid = true
	
	var labeltext = self.Label ? self.Label.innerText : null

	try {
		if (isRequired && isEmpty) {
			var errormessage = invalid!=null ? invalid : `field '${labeltext}' is required`	
			throw new Error(errormessage)
		}

		if (!textLengthValidation(self.value, minlength, maxlength)) {
			var errormessage = invalid!=null ? invalid : `field '${labeltext}' must be at least ${minlength} and maximum ${maxlength} characters long`
			throw new Error(errormessage)
		}

		var errormessage = customValidation(self.value, validator)
		if (errormessage) {
			throw new Error(errormessage)
		}

		// hapus pesan error jika ada
		var errmsg = self.Wrapper.parentNode.querySelector('.fgta5-errormessage')
		if (errmsg) {
			errmsg.parentNode.removeChild(errmsg)
		}

		return true
	} catch (e) {

		self.SetError(e.message)
		console.log(e.message)

		// tampilkan pesan error di di bawah input
		var errmsg = self.Wrapper.parentNode.querySelector('.fgta5-errormessage')
		if (!errmsg) {
			errmsg = document.createElement('div')
			errmsg.innerText = e.message
			errmsg.classList.add('fgta5-errormessage')
			self.Wrapper.parentNode.appendChild(errmsg)
		}

		return false
	}	
}


