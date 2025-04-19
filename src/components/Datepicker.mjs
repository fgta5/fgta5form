import Input from "./Input.mjs"

export default class Datepicker extends Input {
	constructor(id) {
		super(id)
		Datepicker_construct(this, id)
	}

	get Value() { return this.Element.value }
	set Value(v) {	
		this.Element.value = v
	}

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Datepicker_setDisabled(this, v)
	}


	SetEditingMode(editingmode) {
		Datepicker_SetEditingMode(this, editingmode)
	}

}


function Datepicker_construct(self, id) {
	console.log(`construct datepicker ${id}`)

	const elContainer =document.createElement('div')
	const el = self.Element
	const lbl = document.querySelector(`label[for="${self.Id}"]`)
	const disp = document.createElement('input')
	const btn = document.createElement('button')
	const wrap =  document.createElement("div")

	self.Display = disp
	self.Button = btn
	self.Wrapper = wrap
	self.Label = lbl
	
	el.setAttribute('type', 'date') // sembunyikan input utama, nanti diganti dengan textbox untuk display value
	el.classList.add('fgta5-datepicker-value')
	el.parentNode.insertBefore(wrap, el)
	el.onchange = (evt) => {
		Datepicker_changed(self, evt.target.value)
	}

	//setup display
	disp.setAttribute('id', `${self.Id}-display`)
	disp.setAttribute('type', 'text')
	disp.setAttribute('readonly', true)
	disp.setAttribute('autocomplete', 'off')
	disp.setAttribute('spellcheck', 'false')
	disp.setAttribute('placeholder', self.Element.getAttribute('placeholder'))
	disp.classList.add('fgta5-datepicker-display')

	// Modify label
	lbl.setAttribute('for', `${self.Id}-display`)

	// Setup Button
	btn.setAttribute('type', 'button')
	btn.classList.add('fgta5-datepicker-button')
	btn.innerHTML = `<svg transform="translate(0 3)" width="12" height="12" stroke="currentColor" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.3095" y="6.6682" width="21.393" height="1.8579" fill="none" stroke-width="2"/>
		<rect x=".81949" y="10" width="22.341" height="13.251" fill="none" stroke-width="1.02"/>
		<rect x="3.8664" y="1.1531" width="2.5776" height="1.4923" fill="none" stroke-width="2"/>
		<rect x="17.223" y="1.1203" width="2.5776" height="1.6958" fill="none" stroke-width="2"/>
		<path d="m1.2888 16.278 21.367-0.13566" fill="none" stroke-width="1.02"/>
		<path d="m8.2775 10.07-0.13566 12.888" fill="none" stroke-width="1.02"/>
		<path d="m15.799 9.9671-0.13566 12.888" fill="none" stroke-width="1.02"/>
		</svg>`

	btn.appendChild(el);
	btn.addEventListener('click', () => {
		Datepicker_click(self)
	})


	wrap.appendChild(disp)
	wrap.appendChild(btn)
	wrap.classList.add('fgta5-wrapper-textbox')	
	wrap.parentNode.insertBefore(elContainer, wrap)

	elContainer.appendChild(wrap)
	elContainer.classList.add('fgta5-input-container')

}

function Datepicker_SetEditingMode(self, editingmode) {
	self.EditingMode = editingmode

	if (self.Button.disabled) {
		return
	}
	
	console.log('datepicker set editing mode: ', editingmode)
	if (editingmode) {
		self.Display.classList.add('fgta5-input-editmode')
		self.Wrapper.removeAttribute('readonly')
		self.Button.style.visibility = 'visible'
	} else {
		self.Display.classList.remove('fgta5-input-editmode')
		self.Wrapper.setAttribute('readonly', "true")
		self.Button.style.visibility = 'hidden'
	}
}


function Datepicker_setDisabled(self, disabled) {
	if (disabled) {
		self.Display.setAttribute('disabled', true)
		self.Display.classList.add('fgta5-datepicker-display-disabled')
		self.Button.classList.add('fgta5-datepicker-button-disabled')
	} else {
		self.Display.removeAttribute('disabled')
		self.Display.classList.remove('fgta5-datepicker-display-disabled')
		self.Button.classList.remove('fgta5-datepicker-button-disabled')
	}
	
}


function Datepicker_changed(self, newvalue) {
	const [ye, mo, dt] = newvalue.split('-');
	self.Display.value = `${dt}/${mo}/${ye}`
}


function Datepicker_click(self) {
	//console.log('datepicker clicked')
	//console.warn('datepicker clicked still not implemented')

}

