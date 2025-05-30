import Input from "./Input.mjs"


const button_icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg transform="translate(0 3)" width="12" height="12" stroke="currentColor" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="m12.339 12.142 0.01403-6.5322" fill="none" stroke-width="2"/>
<path d="m8.4232 14.469 3.7103-1.9861" fill="none" stroke-width="2.4"/>
<ellipse cx="12.004" cy="11.983" rx="10.102" ry="9.9964" fill="none" stroke-width="2.4"/>
</svg>

`


/*
 * https://weblog.west-wind.com/posts/2023/Feb/06/A-Button-Only-Date-Picker-and-JavaScript-Date-Control-Binding
 */
export default class Datepicker extends Input {
	constructor(id) {
		super(id)
		Timepicker_construct(this, id)
	}

	get Min() { return this.Element.min }
	set Min(v) { this.Element.min = v }

	get Max() { return this.Element.max }
	set Max(v) { this.Element.max = v }


	get Value() { return this.Element.value }
	set Value(v) {
		Timepicker_setValue(this, v)
	}

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Timepicker_setDisabled(this, v)
	}

	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Timepicker_SetEditingMode(this, ineditmode)
	}

	SetError(msg) {
		super.SetError(msg)
		Timepicker_SetError(this, msg)
	}
	
	NewData(initialvalue) {
		if (initialvalue=='' || initialvalue==null) {
			initialvalue = '00:00'
		}
		super.NewData(initialvalue)
	}
}




function Timepicker_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const display = document.createElement('input')
	const button = document.createElement('button')
	const label = document.querySelector(`label[for="${id}"]`)

	input.parentNode.insertBefore(container, input)
	

	wrapinput.classList.add('fgta5-entry-input-wrapper')
	display.classList.add('fgta5-entry-display')
	display.classList.add('fgta5-entry-display-datepicker')
	button.classList.add('fgta5-entry-button-datepicker')	

	wrapinput.appendChild(display)
	wrapinput.appendChild(button)
	button.innerHTML = button_icon
	// button.appendChild(input)
	button.insertBefore(input, button.firstChild)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)

	display.setAttribute('type', 'text')
	display.setAttribute('picker', 'time')
	display.setAttribute('fgta5-component', 'Timepicker')
	display.setAttribute('readonly', 'true')

	var placeholder = input.getAttribute('placeholder')
	if (placeholder!=null && placeholder !='') {
		display.setAttribute('placeholder', placeholder)
	}

	var cssclass = input.getAttribute('class')
	if (cssclass!=null && cssclass !='') {
		display.setAttribute('class', cssclass)
	}
	
	var cssstyle = input.getAttribute('style')
	if (cssstyle!=null && cssstyle !='') {
		display.setAttribute('style', cssstyle)
	}


	input.setAttribute('type', 'time')
	input.setAttribute('picker', 'time')
	input.removeAttribute('class')
	input.removeAttribute('style')
	input.classList.add('fgta5-entry-input')
	input.classList.add('fgta5-entry-input-datepicker')
	
	input.addEventListener('change', (e)=>{
		Timepicker_changed(self)
	})
	


	button.id = self.Id + '-button'

	label.setAttribute('for', button.id)


	// set input description
	self._setupDescription()

	// tambahkan referensi elemen ke Nodes
	self.Nodes.InputWrapper = wrapinput
	self.Nodes.Label = label 
	self.Nodes.Display = display
	self.Nodes.Button = button

	if (input.value === null || input.value === '') {
		self.Value = "00:00"
	} else {
		self.Value = input.value
	}
	self._setLastValue(input.value)

	self.Nodes.Input.getInputCaption = () => {
		return label.innerHTML
	}
}


function Timepicker_setDisabled(self, v) {
	if (v) {
		self.Nodes.Display.disabled = true
		self.Nodes.InputWrapper.setAttribute('disabled', 'true')
		self.Nodes.Button.setAttribute('disabled', 'true')
	} else {
		self.Nodes.Display.disabled = false
		self.Nodes.InputWrapper.removeAttribute('disabled')
		self.Nodes.Button.removeAttribute('disabled')

	}
}


function Timepicker_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'

	self.Nodes.Display.setAttribute('editmode', attrval)
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.InputWrapper.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Nodes.Input.removeAttribute('readonly')
	} else {
		self.Nodes.Input.setAttribute('readonly', 'true')
		self.SetError(null)
	}
}

function Timepicker_changed(self) {
	Timepicker_setDisplay(self, self.Nodes.Input.value)
	if (self.InEditMode) {
		self.SetError(null)
		self.Validate()
	}
}

function Timepicker_setValue(self, dt) {
	Timepicker_setDisplay(self, dt)
}


function Timepicker_setDisplay(self, tm) {
	self.Nodes.Display.value = tm
}

function Timepicker_SetError(self, msg) {
	if (msg!== null && msg !== '') {
		self.Nodes.Display.setAttribute('invalid', 'true')
	} else {
		self.Nodes.Display.removeAttribute('invalid')
	}
}
