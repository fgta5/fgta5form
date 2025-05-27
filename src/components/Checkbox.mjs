import Input from "./Input.mjs"


export default class Checkbox extends Input {

	constructor(id) {
		super(id)
		Checkbox_construct(this, id)
	}

	get Value() { return this.Element.checked ? 1 : 0}
	set Value(v) { 
		this.Element.checked = v 
	}


	get Disabled() { return Checkbox_getDisabled(this) }
	set Disabled(v) { 
		this.Element.disabled = v 
		Checkbox_setDisabled(this, v)
	}


	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) {
		this.#_ineditmode = ineditmode
		Checkbox_SetEditingMode(this, ineditmode)
	}



	_setLastValue(v) {
		Checkbox_setLastValue(this, v)
	}
}


/*
* reference:
* https://moderncss.dev/pure-css-custom-checkbox-style/
*/
function Checkbox_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const label = document.querySelector(`label[for="${id}"]`)

	
	input.classList.add('fgta5-checkbox-input')
	input.parentNode.insertBefore(container, input)


	var text = document.createTextNode(label.innerHTML)
	var caption = document.createElement("label")

	caption.classList.add('fgta5-checkbox')
	caption.text = text

	container.appendChild(caption)
	container.appendChild(lastvalue)
	
	caption.appendChild(input)
	caption.appendChild(text)

	label.innerHTML = ""
	label.removeAttribute("for")


	self._setLastValue(self.Value)


	self.Nodes.Caption = caption
	self.Nodes.Label = label 
}

function Checkbox_getDisabled(self) {
	var disabled = self.Nodes.Input.getAttribute('permanent-disabled')
	if (disabled === null) {
		return false
	}
	if (disabled === 'true') {
		return true
	}

	return false
}

function Checkbox_setDisabled(self, v) {
	if (v) {
		self.Nodes.Input.setAttribute('permanent-disabled', 'true')
	} else {
		self.Nodes.Input.removeAttribute('permanent-disabled')
	}
}


function Checkbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'

	if (self.Disabled) {
		return
	}

	self.Nodes.Input.setAttribute('editmode', attrval)
	if (ineditmode) {
		self.Nodes.Input.removeAttribute('disabled')
	} else {
		self.Nodes.Input.setAttribute('disabled', 'true')
	}
}

function Checkbox_setLastValue(self, v) {
	// console.log(`Checkbox '${self.Id}' set last value from '${self.Nodes.LastValue.value}' to '${v}'`)
	self.Nodes.LastValue.value = v
}