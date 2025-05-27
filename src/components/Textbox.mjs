import Input from "./Input.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
	}


	get Value() { 
		return Textbox_GetValue(this) 
	}


	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Textbox_SetEditingMode(this, ineditmode)
	}

}



function Textbox_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const label = document.querySelector(`label[for="${id}"]`)
	
	input.classList.add('fgta5-entry-input')
	input.parentNode.insertBefore(container, input)

	wrapinput.classList.add('fgta5-entry-input-wrapper')

	wrapinput.appendChild(input)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)


	if (input.style.backgroundColor !== '') {
		wrapinput.style.backgroundColor = input.style.backgroundColor
		input.style.backgroundColor = 'transparent'
	}


	var charCase = self.Element.getAttribute('character-case') 
	if (charCase !== null && charCase.trim() !== '') {
		input.charCase = charCase.trim().toLowerCase()
	}

	// set input value
	self._setLastValue(self.Value)

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
		if (self.GetLastValue() != input.value) {
			input.setAttribute('changed', 'true')
		} else {
			input.removeAttribute('changed')
		}
	});

	input.addEventListener('blur', function(e) {
		Textbox_blur(self, e)
		
	})


	// tambahkan referensi elemen ke Nodes
	self.Nodes.InputWrapper = wrapinput
	self.Nodes.Label = label 

	self.Nodes.Input.getInputCaption = () => {
		return label.innerHTML
	}
}


function Textbox_GetValue(self) {
	var input = self.Nodes.Input
	var value = input.value
	if (input.charCase === 'uppercase') {
		value = value.toUpperCase()
	} else if (input.charCase === 'lowercase') {
		value = value.toLowerCase()
	}
	return value
}


function Textbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.InputWrapper.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Nodes.Input.removeAttribute('readonly')
	} else {
		self.Nodes.Input.setAttribute('readonly', 'true')
		self.SetError(null)
	}
}

function Textbox_blur(self, e) {
	if (self.InEditMode) {
		self.SetError(null)
		self.Validate()
	}
}