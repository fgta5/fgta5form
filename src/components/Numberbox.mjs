import $fgta5 from "../main.mjs"
import Input from "./Input.mjs"


export default class Numberbox extends Input {

	constructor(id) {
		super(id)
		Numberbox_construct(this, id)
		Numberbox_readValidators(this)
	}

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Numberbox_setDisabled(this, v)
	}

	SetEditingMode(ineditmode) {
		Numberbox_SetEditingMode(this, ineditmode)
	}

}

function Numberbox_construct(self, id) {
	const container = document.createElement('div')
	const wrapinput = document.createElement('div')
	const input = self.Element
	const display = document.createElement('input')
	const lstvalue = document.createElement('input')
	const label = document.querySelector(`label[for="${self.Id}"]`)
	

	container.classList.add('fgta5-entry-container')
	wrapinput.classList.add('fgta5-entry-input-wrapper')
	input.classList.add('fgta5-entry-input')
	display.classList.add('fgta5-entry-display')
	lstvalue.classList.add('fgta5-entry-lastvalue')

	input.parentNode.insertBefore(container, input)
	container.appendChild(wrapinput)
	wrapinput.appendChild(display)
	wrapinput.appendChild(input)
	container.appendChild(lstvalue)

	display.setAttribute('type', 'number')
	display.setAttribute('fgta5-component', 'Numberbox')
	input.setAttribute('type', 'hidden')
	lstvalue.setAttribute('type', 'hidden') 


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


	display.addEventListener('focus', function(e) {
		Numberbox_displayFocus(self, e)
	})

	display.addEventListener('blur', function(e) {
		Numberbox_displayBlur(self, e)
	})

	display.addEventListener('change', function(e) {
		Numberbox_displayChanged(self, e)
	})

	display.addEventListener("input", function(event) {
		if (display.value !== lstvalue.value) {
			display.setAttribute('changed', 'true')
		} else {
			display.removeAttribute('changed')
		}
	})


	

	self.Nodes = {
		Container: container,
		InputWrapper: wrapinput,
		Input: input,
		Display: display,
		LastValue: lstvalue,
		Label: label
	}	

}

function Numberbox_setDisabled(self, v) {
	if (v) {
		self.Nodes.Display.disabled = true
	} else {
		self.Nodes.Display.disabled = false
	}
}

function Numberbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'

	self.Nodes.Display.setAttribute('editmode', attrval)
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.InputWrapper.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Nodes.Input.removeAttribute('readonly')
		self.Nodes.Display.removeAttribute('readonly')
	} else {
		self.Nodes.Input.setAttribute('readonly', 'true')
		self.Nodes.Display.setAttribute('readonly', 'true')
		self.SetError(null)
	}
}

function Numberbox_displayFocus(self, e) {
	var display = self.Nodes.Display
	var input = self.Nodes.Input
	
	
	display.setAttribute('type', 'number')
	
	var num = Number(input.value)
	display.value = num

}

function Numberbox_displayBlur(self, e) {
	var display = self.Nodes.Display
	var input = self.Nodes.Input
	
	console.log('blur')
	var num = Number(display.value)
	if (isNaN(num)) {
		self.SetError('Invalid number')
	} else {
		self.SetError(null)
		input.value = num

		// // tampilkan kembali nilai terformat ke display
		const formatterFixed = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

		var formattedValue = formatterFixed.format(num)
		display.setAttribute('type', 'text')
		display.value = formattedValue

	}

}

function Numberbox_displayChanged(self, e) {
	var display = self.Nodes.Display
	var input = self.Nodes.Input
	
	// set nilai input menjadi nilai display
	console.log('changed')

	
}



function Numberbox_readValidators(self) {

}

