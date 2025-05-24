import Input from "./Input.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
	}

	SetEditingMode(ineditmode) {
		Textbox_SetEditingMode(this, ineditmode)
	}

	NewData() {
		Textbox_NewData(this)
	}
	
	AcceptChanges() {
		Textbox_AcceptChanges(this)
	}
	
	Reset() {
		Textbox_Reset(this)
	}
	
	IsChanged() { 
		return Textbox_IsChanged(this)
	}

}



function Textbox_construct(self, id) {
	const container = document.createElement('div')
	const wrapinput = document.createElement('div')
	const input = self.Element
	const lstvalue = document.createElement('input')

	container.classList.add('fgta5-entry-container')
	wrapinput.classList.add('fgta5-entry-input-wrapper')
	input.classList.add('fgta5-entry-input')
	lstvalue.classList.add('fgta5-entry-lastvalue')

	input.parentNode.insertBefore(container, input)
	container.appendChild(wrapinput)
	wrapinput.appendChild(input)
	container.appendChild(lstvalue)

	lstvalue.setAttribute('type', 'hidden') 


	self.Nodes = {
		Container: container,
		InputWrapper: wrapinput,
		Input: input,
		LastValue: lstvalue,
	}
}


function Textbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'
	self.Nodes.Input.setAttribute('editmode', attrval)
	self.Nodes.Container.setAttribute('editmode', attrval)

	if (ineditmode) {
		self.Element.removeAttribute('readonly')
	} else {
		self.Element.setAttribute('readonly', 'true')
	}
}

function Textbox_NewData(self) {
	var initialvalue = ""
	self.Value = initialvalue
	self.Nodes.LastValue.value = initialvalue
}

function Textbox_AcceptChanges(self) {
	self.Nodes.LastValue.value = self.Value
}

function Textbox_Reset(self) {
	self.Value = self.Nodes.LastValue.value
}

function Textbox_IsChanged(self) {
	if (self.Nodes.LastValue.value != self.Value) {
		return true
	} else {
		return false
	}
}