import Input from "./Input.mjs"
import { doValidation } from "../validator.mjs"


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
	self.Wrapper = document.createElement("div");
	self.Element.classList.add('fgta5-textbox')
	var inputElement = self.Element

	// Buat elemen div baru
	inputElement.parentNode.insertBefore(self.Wrapper, inputElement);

	// Pindahkan input ke dalam div
	self.Wrapper.appendChild(inputElement);
	self.Wrapper.classList.add('fgta5-wrapper-textbox')	
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
	} else {
		self.Element.classList.remove('fgta5-input-editmode')
		self.Element.readOnly = true
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
	var validator = self.Element.getAttribute('validator')
	
	var valid = doValidation(self.Element, validator); 
	
	

	// const validating = new CustomEvent('validating', { cancelable: true });
	// self.Element.dispatchEvent(validating)

	// if (validating.defaultPrevented) {
	// 	return false
	// } else {
	// 	return true
	// }
}
