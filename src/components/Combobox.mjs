import Input from "./Input.mjs"


const button_icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg transform="translate(0 3)" width="12" height="12" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path transform="matrix(.8169 0 0 -.64538 10.987 14.119)" d="m11.299 11.275h-10.157l-10.157-1e-6 10.157-17.593 5.0786 8.7965z"/>
</svg>
`


export default class Combobox extends Input {

	constructor(id) {
		super(id)
		Combobox_construct(this, id)
	}

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { 
		this.Element.disabled = v 
		Combobox_setDisabled(this, v)
	}

	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Combobox_SetEditingMode(this, ineditmode)
	}

}


function Combobox_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const display = document.createElement('input')
	const button = document.createElement('button')
	const label = document.querySelector(`label[for="${id}"]`)
	const datalist = input.parentNode.querySelector(`datalist[for="${id}"]`)
	const dialog = document.createElement('dialog')

	// setup container, (harus di awal seblum yang lain-lain)
	// diperlukan untuk menampung semua element yang akan ditampilkan
	input.parentNode.insertBefore(container, input)

	// tambahkan elemen-element
	wrapinput.appendChild(input)
	wrapinput.appendChild(display)
	wrapinput.appendChild(button)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)
	document.body.appendChild(dialog)

	// setup wrapper
	wrapinput.classList.add('fgta5-entry-input-wrapper')

	// setup input
	input.classList.add('fgta5-entry-input')
	input.setAttribute('type', 'hidden')
	input.getInputCaption = () => {
		return label.innerHTML
	}

	// setup display
	display.id = self.Id + '-display'
	display.classList.add('fgta5-entry-display')
	display.setAttribute('style', input.getAttribute('style') || '')
	display.setAttribute('type', 'text')
	display.setAttribute('readonly', 'true')
	display.setAttribute('fgta5-component', 'Combobox')
	display.required = input.required

	// setup button
	button.classList.add('fgta5-entry-button-combobox')	
	button.innerHTML = button_icon
	button.addEventListener('click', (e)=>{
		Combobox_buttonClick(self, e)
	})


	// setup label
	label.setAttribute('for', display.id)

	// dialog
	Combobox_createDialog(dialog)
	dialog.addEventListener("cancel", (e)=>{
		dialog.setAttribute('removing', 'true')
		e.preventDefault()
		setTimeout(() => {
			dialog.close()
			dialog.removeAttribute('removing')
			dialog.removeAttribute('showed')
		}, 200);
    });

	// datalist
	if (datalist!=null) {
		datalist.remove()
		Combobox_createStaticOptions(dialog, datalist)
	}


	// tambahkan referensi elemen ke Nodes
	self.Nodes.InputWrapper = wrapinput
	self.Nodes.Label = label 
	self.Nodes.Display = display
	self.Nodes.Button = button
	self.Nodes.Dialog = dialog
}


function Combobox_setDisabled(self, v) {
	if (v) {
		self.Nodes.Display.disabled = true
		self.Nodes.Button.disabled = true
	} else {
		self.Nodes.Display.disabled = false
		self.Nodes.Button.disabled = false
	}
}

function Combobox_buttonClick(self, e) {
	var editmode = self.Nodes.Button.getAttribute('editmode')
	if (editmode!=="true") {
		return
	}

	self.Nodes.Dialog.showModal()
	self.Nodes.Dialog.setAttribute('showed', 'true')
}

function Combobox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'

	self.Nodes.Display.setAttribute('editmode', attrval)
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.InputWrapper.setAttribute('editmode', attrval)
	self.Nodes.Button.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Nodes.Input.removeAttribute('readonly')
	} else {
		self.Nodes.Input.setAttribute('readonly', 'true')
		self.SetError(null)
	}
}

function Combobox_createStaticOptions(dialog, datalist) {
	const options = datalist.getElementsByTagName("option");
	let dataArray = [];

	for (let option of options) {
		var value = option.value
		var text = option.textContent || option.innerText
		var line = document.createTextNode(text)
		dialog.appendChild(line)
		var br = document.createElement('br')
		dialog.appendChild(br)
	}
	

}

function Combobox_createDialog(dialog) {
	dialog.classList.add('fgta5-combobox-dialog')

	var head = document.createElement('div')
	head.classList.add('fgta5-combobox-dialog-head')
	head.innerHTML = 'header'

	dialog.appendChild(head)
}