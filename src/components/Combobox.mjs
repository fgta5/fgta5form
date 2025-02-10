import Input from "./Input.mjs"
import { customValidation, textLengthValidation } from "../validator.mjs"


export default class Combobox extends Input {
	constructor(id) {
		super(id)
		Combobox_construct(this, id)
	}


	SetEditingMode(editingmode) {
		Combobox_SetEditingMode(this, editingmode)
	}

}

function Combobox_construct(self, id) {
	const elContainer =document.createElement('div')

	self.Display = document.createElement('input')
	self.Display.setAttribute('type', 'text')
	self.Display.setAttribute('readonly', true)
	self.Display.setAttribute('autocomplete', 'off')
	self.Display.setAttribute('spellcheck', 'false')
	self.Display.setAttribute('placeholder', self.Element.getAttribute('placeholder'))
	self.Display.classList.add('fgta5-combobox-display')
	
	self.Button = document.createElement('button')
	self.Button.setAttribute('type', 'button')
	self.Button.classList.add('fgta5-combobox-button')
	self.Button.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 3)"><path d="M6 9l6 6 6-6"/></svg>'
	self.Button.addEventListener('click', () => {
		Combobox_click(self)
	})

	self.Wrapper = document.createElement("div")
	self.Element.setAttribute('type', 'hidden') // sembunyikan input utama, nanti diganti dengan textbox untuk display value
	self.Label = document.querySelector(`label[for="${self.Id}"]`) // ambil label dari input ini

	self.Element.parentNode.insertBefore(self.Wrapper, self.Element)

	self.Wrapper.appendChild(self.Display);
	self.Wrapper.appendChild(self.Button);
	self.Wrapper.classList.add('fgta5-wrapper-textbox')	

	// masukkan text wrapper ke dalam container
	self.Wrapper.parentNode.insertBefore(elContainer, self.Wrapper)
	elContainer.appendChild(self.Wrapper)
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

function Combobox_click(self) {
	console.log('combobox clicked')
}