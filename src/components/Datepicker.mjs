import Input from "./Input.mjs"


const button_icon = `<svg transform="translate(0 3)" width="12" height="12" stroke="currentColor" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.3095" y="6.6682" width="21.393" height="1.8579" fill="none" stroke-width="2"/>
		<rect x=".81949" y="10" width="22.341" height="13.251" fill="none" stroke-width="1.02"/>
		<rect x="3.8664" y="1.1531" width="2.5776" height="1.4923" fill="none" stroke-width="2"/>
		<rect x="17.223" y="1.1203" width="2.5776" height="1.6958" fill="none" stroke-width="2"/>
		<path d="m1.2888 16.278 21.367-0.13566" fill="none" stroke-width="1.02"/>
		<path d="m8.2775 10.07-0.13566 12.888" fill="none" stroke-width="1.02"/>
		<path d="m15.799 9.9671-0.13566 12.888" fill="none" stroke-width="1.02"/>
		</svg>`


/*
 * https://weblog.west-wind.com/posts/2023/Feb/06/A-Button-Only-Date-Picker-and-JavaScript-Date-Control-Binding
 */
export default class Datepicker extends Input {

	constructor(id) {
		super(id)
		Datepicker_construct(this, id)
	}


	get Value() { return this.Element.value }
	set Value(v) {
		if (v instanceof Date) {
			v = v.toISOString().split("T")[0]
		}
		this.Element.value = v
		Datepicker_setValue(this, v)
	}

	get Min() { 
		if (this.Element.min!="") {
			var dt = new Date(this.Element.min );
			return dt
		} else {
			return null
		}
	}
	set Min(v) {
		if (v instanceof Date) {
			this.Element.min = v.toISOString().split("T")[0]
		} else if (typeof v === "string") {
			this.Element.min = v
		}
	}

	get Max() { 
		if (this.Element.max!="") {
			var dt = new Date(this.Element.max);
			return dt
		} else {
			return null
		}
	}
	set Max(v) {
		if (v instanceof Date) {
			this.Element.max = v.toISOString().split("T")[0]
		} else if (typeof v === "string") {
			this.Element.max = v
		}
	}


	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Datepicker_setDisabled(this, v)
	}


	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Datepicker_SetEditingMode(this, ineditmode)
	}


	SetError(msg) {
		super.SetError(msg)
		Datepicker_SetError(this, msg)
	}


	NewData(initialvalue) {
		if (initialvalue=='' || initialvalue==null) {
			initialvalue = new Date()
		}
		super.NewData(initialvalue)
	}
	

}

function Datepicker_construct(self, id) {
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
	button.appendChild(input)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)
	container.setAttribute('fgta5-component', 'Datepicker')

	display.setAttribute('id', `${id}-display`)
	display.setAttribute('type', 'text')
	display.setAttribute('fgta5-component', 'Datepicker')
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


	input.setAttribute('type', 'date')
	input.removeAttribute('class')
	input.removeAttribute('style')
	input.classList.add('fgta5-entry-input')
	input.classList.add('fgta5-entry-input-datepicker')
	
	input.addEventListener('change', (e)=>{
		console.log('date changed')
		Datepicker_changed(self)
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
		self.Value = new Date()
	} else {
		self.Value = input.value
	}
	self._setLastValue(input.value)

	self.Nodes.Input.getInputCaption = () => {
		return label.innerHTML
	}
}



function Datepicker_setDisabled(self, v) {
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


function Datepicker_SetEditingMode(self, ineditmode) {
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

function Datepicker_setValue(self, dt) {
	Datepicker_setDisplay(self, dt)
}

function Datepicker_changed(self) {
	
	Datepicker_setDisplay(self, self.Nodes.Input.value)
	if (self.InEditMode) {
		self.SetError(null)
		self.Validate()
	}
}

function Datepicker_setDisplay(self, dt) {
	const date = new Date(dt);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };

	const formattedDate = date.toLocaleDateString('en-ID', options).replace('.', ''); 
	self.Nodes.Display.value = formattedDate


}


function Datepicker_SetError(self, msg) {
	if (msg!== null && msg !== '') {
		self.Nodes.Display.setAttribute('invalid', 'true')
	} else {
		self.Nodes.Display.removeAttribute('invalid')
	}
}

