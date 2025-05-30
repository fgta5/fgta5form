import Input from "./Input.mjs"

const events = {
	change: new CustomEvent('change')
}

const icon_cbo_button = `<?xml version="1.0" encoding="UTF-8"?>
<svg transform="translate(0 3)" width="12" height="12" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path transform="matrix(.8169 0 0 -.64538 10.987 14.119)" d="m11.299 11.275h-10.157l-10.157-1e-6 10.157-17.593 5.0786 8.7965z"/>
</svg>
`

const icon_cbo_close = `<?xml version="1.0" encoding="UTF-8"?>
<svg transform="translate(0 3)" width="12" height="12" stroke="currentColor" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="m3.5642 20.295 16.853-16.833" fill="none" stroke-width="4"/>
<path d="m3.5741 3.4523 16.833 16.853" fill="none" stroke-width="4"/>
</svg>`


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

	addEventListener = (evt, callback) => {
		if (['change'].includes(evt)) {
			this.Listener.addEventListener(evt, callback)
		} else {
			super.addEventListener(evt, callback)
		}
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
	button.innerHTML = icon_cbo_button
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
		Combobox_createStaticOptions(self, dialog, datalist)
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

	var btnClose = self.Nodes.Dialog.querySelector('.fgta5-combobox-dialog-head > button')
	if (btnClose.onclick==null) {
		btnClose.onclick=(e) => {
			self.Nodes.Dialog.setAttribute('removing', 'true')
			setTimeout(() => {
				self.Nodes.Dialog.close()
				self.Nodes.Dialog.removeAttribute('removing')
				self.Nodes.Dialog.removeAttribute('showed')
			}, 200);
		}
	}

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

function Combobox_createStaticOptions(self, dialog, datalist) {
	const options = datalist.getElementsByTagName("option");
	

	var thead = dialog.getElementsByTagName('thead')[0]
	var tbody = dialog.getElementsByTagName('tbody')[0]
	var tfoot = dialog.getElementsByTagName('tfoot')[0]

	
	thead.style.display='none'
	tfoot.style.display='none'

	for (let option of options) {
		let value = option.value
		let text = option.textContent || option.innerText

		var tr = document.createElement('tr')
		var td = document.createElement('td')
		
		td.setAttribute('option', '')
		td.setAttribute('value', value)
		
		td.innerHTML = text

		tr.appendChild(td)
		tbody.appendChild(tr)

		td.addEventListener('click', (e)=>{
			self.Nodes.Input.value = value
			self.Nodes.Display.value = text

			// trigger event
			let change = new CustomEvent('change', {
				detail: {value: value, text: text}
			})
			self.Listener.dispatchEvent(change)

			// tutup
			self.Nodes.Dialog.removeAttribute('showed')
			setTimeout(() => {
				self.Nodes.Dialog.close()
			}, 200);
		})
	}

}

function Combobox_createDialog(dialog) {
	dialog.classList.add('fgta5-combobox-dialog')

	// buat header dialog
	var head = document.createElement('div')
	head.classList.add('fgta5-combobox-dialog-head')
	head.innerHTML = 'judul'
	dialog.appendChild(head)

	// tombol tutup dialog (tanpa memilih)
	var btnClose = document.createElement('button')
	btnClose.innerHTML = icon_cbo_close
	head.appendChild(btnClose)
	
	// template tabel dialog
	var table = document.createElement('table')
	var thead = document.createElement('thead')
	var tbody = document.createElement('tbody')
	var tfoot = document.createElement('tfoot')

	dialog.appendChild(table)
	table.appendChild(tbody)
	table.appendChild(tfoot)
	table.appendChild(thead)

}