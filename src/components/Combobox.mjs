import Input from "./Input.mjs"
import Dialog from "./Dialog.mjs"
import { customValidation, textLengthValidation } from "../validator.mjs"


export default class Combobox extends Input {
	constructor(id) {
		super(id)
		Combobox_construct(this, id)
	}

	get Value() { return this.Element.value }
	set Value(v) {	
		this.Element.value = v
	}


	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Combobox_setDisabled(this, v)
	}

	SetEditingMode(editingmode) {
		Combobox_SetEditingMode(this, editingmode)
	}

}

function Combobox_construct(self, id) {
	console.log(`construct combobox ${id}`)

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

	el.setAttribute('type', 'hidden') // sembunyikan input utama, nanti diganti dengan textbox untuk display value
	el.classList.add('fgta5-combobox-value')
	el.parentNode.insertBefore(wrap, el)

	// Setup Display
	disp.setAttribute('id', `${self.Id}-display`)
	disp.setAttribute('type', 'text')
	disp.setAttribute('readonly', true)
	disp.setAttribute('autocomplete', 'off')
	disp.setAttribute('spellcheck', 'false')
	disp.setAttribute('placeholder', self.Element.getAttribute('placeholder'))

	for (const classname of el.classList) {
		el.classList.remove(classname)
		disp.classList.add(classname)	
	}
	disp.classList.add('fgta5-combobox-display')
	


	// Modify label
	lbl.setAttribute('for', `${self.Id}-display`)

	// Setup Button
	btn.setAttribute('type', 'button')
	btn.classList.add('fgta5-combobox-button')
	btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 3)"><path d="M6 9l6 6 6-6"/></svg>'
	btn.addEventListener('click', () => {
		Combobox_click(self)
	})

	// Setup Wrapper
	wrap.append(el)
	wrap.appendChild(disp)
	wrap.appendChild(btn)
	wrap.classList.add('fgta5-wrapper-textbox')	
	wrap.parentNode.insertBefore(elContainer, wrap)
	
	elContainer.appendChild(wrap)
	elContainer.classList.add('fgta5-input-container')
}


function Combobox_SetEditingMode(self, editingmode) {
	self.EditingMode = editingmode

	if (self.Button.disabled) {
		return
	}

	console.log('combobox set editing mode: ', editingmode)
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


function Combobox_setDisabled(self, disabled) {
	if (disabled) {
		self.Display.setAttribute('disabled', true)
		self.Display.classList.add('fgta5-combobox-display-disabled')
		self.Button.classList.add('fgta5-combobox-button-disabled')
	} else {
		self.Display.removeAttribute('disabled')
		self.Display.classList.remove('fgta5-datepicker-display-disabled')
		self.Button.classList.remove('fgta5-datepicker-button-disabled')
	}
	
}


function Combobox_click(self) {
	console.log('combobox clicked')

	if (self.Dialog === undefined) {
		self.Dialog = new Dialog()
	}

	var dlg = self.Dialog
	dlg.ShowModal()
}


function createDialog(self) {
	const dialog = document.createElement('dialog')
	dialog.innerHTML = 'test ini dialog'
	

	const btnClose = document.createElement('button')
	btnClose.innerHTML = 'Close'
	btnClose.addEventListener('click', () => {
		dialog.close()
	})

	dialog.appendChild(btnClose) 
	return dialog
}