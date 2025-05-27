import Input from "./Input.mjs"


export default class Numberbox extends Input {

	constructor(id) {
		super(id)

		this.formatterFixed = new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});

		Numberbox_construct(this, id)
	}

	get Value() { return this.Element.value }
	set Value(v) { 
		this.Element.value = v 
		Numberbox_setValue(this, v)
	}

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Numberbox_setDisabled(this, v)
	}

	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Numberbox_SetEditingMode(this, ineditmode)
	}

	AcceptChanges() {
		super.AcceptChanges()
		Numberbox_AcceptChanges(this)
		
	}

	Reset() {
		super.Reset()
		Numberbox_Reset(this)
	}

	SetError(msg) {
		super.SetError(msg)
		Numberbox_SetError(this, msg)
	}

	/* * Override addEventListener to use the Display element
	 * This allows the Numberbox to handle events on the display input
	 * instead of the hidden input element.
	 */
	addEventListener(event, callback) {
		this.Nodes.Display.addEventListener(event, callback)
	}

}



function Numberbox_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const display = document.createElement('input')
	const label = document.querySelector(`label[for="${id}"]`)


	input.classList.add('fgta5-entry-input')
	input.parentNode.insertBefore(container, input)
	input.setAttribute('type', 'hidden')

	wrapinput.classList.add('fgta5-entry-input-wrapper')
	display.classList.add('fgta5-entry-display')
	

	wrapinput.appendChild(display)
	wrapinput.appendChild(input)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)



	// set input description
	var description = self.Element.getAttribute('description')
	if (description !== null && description.trim() !== '') {
		description = description.trim()
		const decrdiv = document.createElement('div')
		decrdiv.classList.add('fgta5-entry-description')
		decrdiv.innerHTML = description
		container.appendChild(decrdiv)
	}

	// set precission
	var precision = self.Element.getAttribute('precision')
	if (precision !== null && precision.trim() !== '') {
		precision = parseInt(precision.trim())
		if (isNaN(precision) || precision < 0) {
			precision = 0
		}
		display.setAttribute('precision', precision)
	} else {
		precision = 0
		display.setAttribute('precision', precision)
	}
	input.precision = precision
	self.formatterFixed.minimumFractionDigits = precision
	self.formatterFixed.maximumFractionDigits = precision
	if (input.value === null || input.value === '') {
		input.value = '0'
	}

	self._setLastValue(input.value)

	display.value = self.formatterFixed.format(input.value)
	// console.log(`init numberbox ${self.Id} value: ${input.value}, display: ${display.value}, lastvalue: ${lastvalue.value}`)


	display.id = self.Id + '-display'
	display.min = input.min
	display.max = input.max
	display.minlength = input.minlength
	display.maxlength = input.maxlength
	display.required = input.required
	display.setAttribute('style', input.getAttribute('style') || '')
	display.setAttribute('type', 'text')
	display.setAttribute('fgta5-component', 'Numberbox')


	label.setAttribute('for', display.id)

	// event listener for display
	display.addEventListener('focus', function(e) {
		// console.log('numberbox focus')
		Numberbox_displayFocus(self, e)
	})

	display.addEventListener('blur', function(e) {
		// console.log('numberbox blur')
		Numberbox_displayBlur(self, e)
	})


	display.addEventListener("input", function(event) {
		if (display.value !== lastvalue.value) {
			display.setAttribute('changed', 'true')
		} else {
			display.removeAttribute('changed')
		}
	})




	// tambahkan referensi elemen ke Nodes
	self.Nodes.InputWrapper = wrapinput
	self.Nodes.Label = label 
	self.Nodes.Display = display


	self.Nodes.Input.getInputCaption = () => {
		return label.innerHTML
	}

}

function Numberbox_setValue(self, v) {
	var num = Number(self.Nodes.Input.value)
	var formattedValue = self.formatterFixed.format(num)
	if (self.Nodes.Display.type === 'text') {
		self.Nodes.Display.value = formattedValue
	} else {
		self.Nodes.Display.value = num
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
	
	if (self.InEditMode) {
		display.setAttribute('type', 'number')
	
		var num = Number(input.value)
		display.value = num
	}
}

function Numberbox_displayBlur(self, e) {
	var display = self.Nodes.Display
	var input = self.Nodes.Input
	
	if (self.InEditMode) {
		var num = Number(display.value)
		if (isNaN(num)) {
			self.SetError('Invalid number')
		} else {
			self.SetError(null)

			input.value = num
			self.Validate()

			var formattedValue = self.formatterFixed.format(num)
			display.setAttribute('type', 'text')
			display.value = formattedValue
		}
	}
}




function Numberbox_AcceptChanges(self) {
	self.Nodes.Display.removeAttribute('changed')
}

function Numberbox_Reset(self) {
	self.Nodes.Display.removeAttribute('changed')
}

function Numberbox_SetError(self, msg) {
	if (msg!== null && msg !== '') {
		self.Nodes.Display.setAttribute('invalid', 'true')
	} else {
		self.Nodes.Display.removeAttribute('invalid')
	}
}

