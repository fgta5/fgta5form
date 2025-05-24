import $fgta5 from "../main.mjs"
import Input from "./Input.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
		Textbox_readValidators(this)
	}

	SetEditingMode(ineditmode) {
		Textbox_SetEditingMode(this, ineditmode)
	}

	NewData(initialvalue) {
		Textbox_NewData(this, initialvalue)
	}
	
	AcceptChanges() {
		Textbox_AcceptChanges(this)
	}
	
	Reset() {
		Textbox_Reset(this)
	}
	
	IsChanged() { 
		return Textbox_IsChanged(this)
	}

	Validate() {
		return Textbox_Validate(this)
	}

	SetError(msg) {
		Textbox_SetError(this, msg)
	}
}



function Textbox_construct(self, id) {
	const container = document.createElement('div')
	const wrapinput = document.createElement('div')
	const input = self.Element
	const lstvalue = document.createElement('input')
	const label = document.querySelector(`label[for="${self.Id}"]`)
	

	container.classList.add('fgta5-entry-container')
	wrapinput.classList.add('fgta5-entry-input-wrapper')
	input.classList.add('fgta5-entry-input')
	lstvalue.classList.add('fgta5-entry-lastvalue')
	

	input.parentNode.insertBefore(container, input)
	container.appendChild(wrapinput)
	wrapinput.appendChild(input)
	container.appendChild(lstvalue)

	lstvalue.setAttribute('type', 'hidden') 

	if (input.style.backgroundColor !== '') {
		wrapinput.style.backgroundColor = input.style.backgroundColor
		input.style.backgroundColor = 'transparent'
	}

	// set input value
	lstvalue.value = input.value

	// set input description
	var description = self.Element.getAttribute('description')
	if (description !== null && description.trim() !== '') {
		description = description.trim()
		const decrdiv = document.createElement('div')
		decrdiv.classList.add('fgta5-entry-description')
		decrdiv.innerHTML = description
		container.appendChild(decrdiv)
	}

	input.addEventListener("input", function(event) {
		if (self.Nodes.LastValue.value != input.value) {
			input.setAttribute('changed', 'true')
		} else {
			input.removeAttribute('changed')
		}
	});

	self.Nodes = {
		Container: container,
		InputWrapper: wrapinput,
		Input: input,
		LastValue: lstvalue,
		Label: label
	}
}


function Textbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.InputWrapper.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Element.removeAttribute('readonly')
	} else {
		self.Element.setAttribute('readonly', 'true')
		self.SetError(null)
	}
}

function Textbox_NewData(self, initialvalue) {
	if (initialvalue === undefined || initialvalue === null) {
		initialvalue = ''
	} else if (typeof initialvalue !== 'string') {
		initialvalue = String(initialvalue)
	}
	
	// var initialvalue = ""
	self.Value = initialvalue
	self.Nodes.LastValue.value = initialvalue
	self.SetError(null)
}

function Textbox_AcceptChanges(self) {
	self.Nodes.LastValue.value = self.Value
	self.Element.removeAttribute('changed')
	self.SetError(null)
}

function Textbox_Reset(self) {
	self.Value = self.Nodes.LastValue.value
	self.Element.removeAttribute('changed')
	self.SetError(null)
}

function Textbox_IsChanged(self) {
	if (self.Nodes.LastValue.value != self.Value) {
		return true
	} else {
		return false
	}
}


function Textbox_readValidators(self) {
	var required = self.Element.getAttribute('required')
	if (required != null) {
		if (required.toLowerCase() !== 'false') {
			self.AddValidator('required')
		}
	}

	var minlength = self.Element.getAttribute('minlength')
	if (minlength != null) {
		minlength = parseInt(minlength)
		if (!isNaN(minlength)) {
			self.AddValidator('minlength', minlength)
		}
	}
	var maxlength = self.Element.getAttribute('maxlength')
	if (maxlength != null) {
		maxlength = parseInt(maxlength)
		if (!isNaN(maxlength)) {
			self.AddValidator('maxlength', maxlength)
		}
	}
	var pattern = self.Element.getAttribute('pattern')
	if (pattern != null) {
		if (pattern.trim() !== '') {
			self.AddValidator('pattern', pattern)
		}
	}

	var validator = self.Element.getAttribute('validator')
	if (validator != null && validator.trim() !== '') {
		validator = validator.split(',')
		for (var i=0; i<validator.length; i++) {
			var str = validator[i].trim()
			var { fnName, fnParams } = $fgta5.Validators.parseFunctionParam(str)
			self.AddValidator(fnName, fnParams)
		}
	}
}

function Textbox_Validate(self) {
	console.log(`Textbox_Validate(${self.Id})`)

	for (const [fnName, fnParams] of Object.entries(self.Validators)) {
		var fnValidate = $validators[fnName];

		try {
			if (typeof fnValidate !== 'function') {
				var err = new Error(`Validator function '${fnName}' is not defined or not a function`)
				console.error(err);
				throw err
			}

			var valid = fnValidate(self.Value, fnParams)
			if (!valid) {
				var err = new Error( `Invalid value '${self.Value}' for '${self.Id}' using validator '${fnName}(${fnParams??''})'` )
				console.log(err.message);

				var msg = self.Element.getAttribute(`invalid-message-${fnName}`)
				// ambil invalid message sesuai dengan nama validator
				if (msg === null || msg === '') {
					// jika tidak ada, ambil invalid-message umum
					msg = self.Element.getAttribute(`invalid-message`)
				}
				// jika masih tidak ada, gunakan pesan dari error
				if (msg === null || msg === '') {
					msg = err.message
				}
				throw new Error(msg)
			}
		} catch(err) {
			self.SetError(err.message)
			return false
		}
	}

	return true
}

function Textbox_SetError(self, msg) {
	var errdiv = self.Nodes.Container.querySelector('.fgta5-entry-error')
	if (msg!== null && msg !== '') {
		self.Element.setAttribute('invalid', 'true')
		if (!errdiv) {
			 errdiv = document.createElement('div')
			 errdiv.classList.add('fgta5-entry-error')
			 self.Nodes.Container.insertBefore(errdiv, self.Nodes.InputWrapper.nextSibling)
		}
		errdiv.innerHTML = msg
	} else {
		self.Element.removeAttribute('invalid')
		if (errdiv) {
			errdiv.remove()
		}
	}
}