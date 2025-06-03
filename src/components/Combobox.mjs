'use strict';

import Input from "./Input.mjs"
import Dataloader from "./DataLoader.mjs";

const ChangeEvent = (data) => { return new CustomEvent('change', data) }
const OptionFormattingEvent = (data) => { return new CustomEvent('optionformatting', data) }
const SelectingEvent = (data) => { return new CustomEvent('selecting', data) }


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

	get Value() { return Combobox_getValue(this) }
	set Value(v) {  throw Error('Value is readonly') }

	get Text() { return  Combobox_getText(this) }
	set Text(v) { throw Error('Text is readonly') }

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

	NewData(initialdata) {
		Combobox_NewData(this, initialdata)
	}

	AcceptChanges() {
		super.AcceptChanges()
		Combobox_AcceptChanges(this)
	}
	
	Reset() {
		super.Reset()
		Combobox_Reset(this)
	}

	_setLastValue(v, t) {
		super._setLastValue(v)
		Combobox_setLastValue(this, v, t)
	}

	GetLastValue() {
		return Combobox_GetLastValue(this)
	} 

	GetLastText() {
		return Combobox_GetLastText(this)
	} 

	SetSelected(value, text) {
		if (text===undefined || text===null) {
			text = value
		}
		Combobox_SetSelected(this, value, text)
	}


	ClearOptions() {
		Combobox_ClearOptions(this)
	}

	AddOptions(data) {
		Combobox_AddOptions(this, data)
	}

	SetOptions(data) {
		Combobox_SetOptions(this, data)
	}

	
	Wait(iswaiting) {
		Combobox_Wait(this, iswaiting)
	}
	
	// untuk keperluan abort fetch data yang dibatalkan
	// apabila belum selesai tapi dialog sudah ditutup
	AbortHandler

	// kelengkapan combobox
	#hasdatapaging
	get HasDataPaging() { return this.#hasdatapaging  }
	set HasDataPaging(hasdatapaging) {
		
		Combobox_SetDataPaging(this, hasdatapaging)
	}


	get HasDataFilter() {}
	get FetchUrl() {}


	_setDataProperty(attributes) {

	}


}


function Combobox_SetSelected(self, value, text) {
	self.Nodes.Input.value = value
	self.Nodes.Display.value = text
	Combobox_markChanged(self)
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
	const lasttext = document.createElement('input')


	// setup container, (harus di awal seblum yang lain-lain)
	// diperlukan untuk menampung semua element yang akan ditampilkan
	input.parentNode.insertBefore(container, input)


	// tambahkan elemen-element ke container
	// penambahakn container ke body document pada saat Input_construct di parent class Input
	wrapinput.appendChild(input)
	wrapinput.appendChild(display)
	wrapinput.appendChild(button)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)
	container.appendChild(lasttext)
	container.appendChild(dialog) 


	// tambahkan referensi elemen ke Nodes
	self.Nodes.InputWrapper = wrapinput
	self.Nodes.Label = label 
	self.Nodes.Display = display
	self.Nodes.Button = button
	self.Nodes.Dialog = dialog
	self.Nodes.LastText = lasttext


	// setup container
	container.setAttribute('fgta5-component', 'Combobox')

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
	display.setAttribute('placeholder', input.getAttribute('placeholder'))
	display.required = input.required

	// setup button
	button.classList.add('fgta5-entry-button-combobox')	
	button.innerHTML = icon_cbo_button
	button.addEventListener('click', (e)=>{
		Combobox_buttonClick(self, e)
	})


	// setup lasttext
	lasttext.setAttribute('type', 'hidden')

	// setup label
	label.setAttribute('for', display.id)
	label.classList.add('fgta5-entry-label')


	// required field
	var required = input.getAttribute('required')
	if (required != null) {
		self.MarkAsRequired(true)
	}

	// dialog
	Combobox_createDialog(dialog)
	dialog.addEventListener("cancel", (e)=>{
		dialog.setAttribute('removing', 'true')
		e.preventDefault()
		setTimeout(() => {
			dialog.close()
			dialog.removeAttribute('removing')
			dialog.removeAttribute('showed')
			Combobox_closed(self)
		}, 200);
    });


	// datalist
	if (datalist!=null) {
		datalist.remove()
		var def = Combobox_createStaticOptions(self, dialog, datalist)
		if (def!=null) {
			input.value = def.value
			display.value = def.text
		}
	} else {
		input.value = ''
		display.value = ''
	}


	// baca attribut kelengkapan combobox
	self._read

	// set input description
	self._setupDescription()
	self._setLastValue(input.value, display.value)
	
}


function Combobox_getValue(self) {
	var input = self.Nodes.Input
	if (input.value=='') {
		return null
	} else {
		return input.value
	}
}

function Combobox_getText(self) {
	return self.Nodes.Display.value
}


function Combobox_NewData(self, initialdata) {
	var input = self.Nodes.Input
	var display = self.Nodes.Display


	if (initialdata===undefined) {
		input.value = ''
		display.value = ''
	} else if (typeof initialdata==='string') {
		input.value = initialdata
		display.value = initialdata
	} else if (initialdata!=null) {
		input.value = initialdata.value
		display.value = initialdata.text
	} else {
		input.value = ''
		input.value = ''
	}
	self.Nodes.Display.removeAttribute('changed')

	self.SetError(null)
	self.AcceptChanges()
}

function Combobox_AcceptChanges(self) {
	self.Nodes.Display.removeAttribute('changed')
	self._setLastValue(self.Value, self.Text)
}

function Combobox_Reset(self) {
	self.Value = self.GetLastValue()
	self.Text = self.GetLastText()
	self.Nodes.Display.removeAttribute('changed')
}

function Combobox_setLastValue(self, v, t) {
	self.Nodes.LastValue.value = v
	self.Nodes.LastText.value = t
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


function Combobox_createOptionRow(self, value, text, data) {
	let tr = document.createElement('tr')
	var td = document.createElement('td')

	tr.classList.add('fgta-combobox-option-row')
	tr.setAttribute('value', value)

	td.setAttribute('option', '')
	td.setAttribute('value', value)
	td.innerHTML = text

	tr.appendChild(td)

	td.addEventListener('click', (e)=>{
		self.Nodes.Input.value = value
		self.Nodes.Display.value = text
		Combobox_userSelectValue(self, value, text, data)
	})

	// CATATAN:
	// dispatch event di sini tidak berlaku untuk static options
	// karena event handler pada main program baru akan diexekusi setelah pembuatan content option statis
	self.Listener.dispatchEvent(OptionFormattingEvent({
		detail: {
			value: value,
			text: text,
			tr: tr,
			data: data
		}
	}))

	return tr
} 

function Combobox_createStaticOptions(self, dialog, datalist) {
	const options = datalist.getElementsByTagName("option");
	
	var thead = dialog.getElementsByTagName('thead')[0]
	var tbody = dialog.getElementsByTagName('tbody')[0]
	var tfoot = dialog.getElementsByTagName('tfoot')[0]
	var defaultOption = null
	
	thead.style.display='none'
	tfoot.style.display='none'


	// jika tidak harus diisi,
	// tambahkan opsi none
	if (!self.IsRequired()) {
		var tr = Combobox_createOptionRow(self, '', 'none', {})
		tr.setAttribute('data-none', '')
		tbody.appendChild(tr)
	}

	// selanjutnya isi data berdasar options default
	for (let option of options) {
		let text = option.textContent || option.innerText
		let value = (option.value==null || option.value=='') ? text : option.value

		var def = option.getAttribute('default')
		if (def!=null) {
			defaultOption = {
				value: value,
				text: text
			}
		}

		tbody.appendChild(Combobox_createOptionRow(self, value, text, { option: option }))
	}

	return defaultOption

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

function Combobox_userSelectValue(self, value, text, data) {
	// trigger event
	self.Listener.dispatchEvent(ChangeEvent({
		sender: self,
		detail: {value: value, text: text, data:data, sender: self}
	}))

	Combobox_markChanged(self)

	// tutup
	self.Nodes.Dialog.removeAttribute('showed')
	setTimeout(() => {
		self.Nodes.Dialog.close()
		Combobox_closed(self)
	}, 200);
}

function Combobox_markChanged(self) {
	var display = self.Nodes.Display
	if (self.Value!=self.GetLastValue()) {
		display.setAttribute('changed', 'true')
	} else {
		display.removeAttribute('changed')
	}
}


function Combobox_GetLastValue(self) {
	var lastvalue = self.Nodes.LastValue.value
	if (lastvalue=='') {
		return null
	} else {
		return lastvalue
	}
}

function Combobox_GetLastText(self) {
	return this.Nodes.LastText.value
}


function Combobox_ClearOptions(self, tbody) {
	const dialog = self.Nodes.Dialog
	if (tbody==undefined || tbody==null) {
		tbody = dialog.getElementsByTagName('tbody')[0]
	}

	tbody.replaceChildren()
}

function Combobox_AddOptions(self, data, tbody) {
	if (data==undefined || data==null) {
		return
	}

	const dialog = self.Nodes.Dialog
	if (tbody==undefined || tbody==null) {
		tbody = dialog.getElementsByTagName('tbody')[0]
	}

	for (let row of data) {
		tbody.appendChild(Combobox_createOptionRow(self, row.value, row.text, data))
	}
}

function Combobox_SetOptions(self, data) {
	const dialog = self.Nodes.Dialog
	const tbody = dialog.getElementsByTagName('tbody')[0]

	// hapus dulu datanya
	Combobox_ClearOptions(self, tbody)
	
	// cek apakah tidak required
	// jika tidak required, tambahkan none di paling atas
	if (!self.IsRequired()) {
		// Combobox_addOptionRow(self, tbody, '', '')
	}


	// tampilkan data pada pilihan
	Combobox_AddOptions(self, data, tbody)
}

function Combobox_closed(self) {
	console.log('combobox closed')
	if (typeof self.AbortHandler==='function') {
		self.AbortHandler()
	}
}

function Combobox_buttonClick(self, e) {
	const dialog = self.Nodes.Dialog
	const tbody = dialog.getElementsByTagName('tbody')[0]

	var editmode = self.Nodes.Button.getAttribute('editmode')
	if (editmode!=="true") {
		return
	}




	var markSelected = () => {
		// kalau ada sebelumnya yang dipilih, clear dulu
		var prevselected = dialog.querySelector(`table tr[selected]`)
		if (prevselected != null) {
			prevselected.removeAttribute('selected')
		}

		// set kembali baris yang sedang dipilih saat ini
		var value = self.Value
		var trval = value==null ? '' : value
		var hl = dialog.querySelector(`table tr[value="${trval}"]`)
		if (hl != null) {
			hl.setAttribute('selected', '')
		}
	}


	// required atau nggak
	var addNoneIfNotRequired = () => {
		var none = tbody.querySelector('tr[data-none]')
		if (self.IsRequired()) {
			// hilangkan none
			none.remove()
		} else {
			// tambahkan none jika belum ada
			if (none==null) {
				var tr = Combobox_createOptionRow(self, '', 'none', {})
				tr.setAttribute('data-none', '')
				tbody.prepend(tr)
			}
		}
	}


	markSelected()
	addNoneIfNotRequired()


	// selecting event
	self.Listener.dispatchEvent(SelectingEvent({
		detail: {
			sender: self,
			markSelected: markSelected,
			addNoneIfNotRequired: addNoneIfNotRequired,
			addRow: (value, text, data) => {
				var tr = Combobox_createOptionRow(self, value, text, data)
				tbody.appendChild(tr)
			}
		}
	}))



	dialog.showModal()
	dialog.setAttribute('showed', 'true')

	var btnClose = dialog.querySelector('.fgta5-combobox-dialog-head > button')
	if (btnClose.onclick==null) {
		btnClose.onclick=(e) => {
			dialog.setAttribute('removing', 'true')
			setTimeout(() => {
				dialog.close()
				dialog.removeAttribute('removing')
				dialog.removeAttribute('showed')
				Combobox_closed(self)
			}, 200);
		}
	}

}


function Combobox_Wait(self, iswaiting) {
	const dialog = self.Nodes.Dialog
	var tbody = dialog.getElementsByTagName('tbody')[0]

	iswaiting = iswaiting===undefined ? true : iswaiting
	if (iswaiting) {
		var tr = document.createElement('tr')
		var td = document.createElement('td')

		tr.setAttribute('data-waiting', '')
		td.innerHTML = 'Please Wait ...'
		tr.appendChild(td)
		tbody.appendChild(tr)
	} else {
		var el = tbody.querySelector('[data-waiting]')
		if (el!=null) {
			el.remove()
		}
	}

}