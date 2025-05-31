import Input from "./Input.mjs"


/*
* reference:
* https://moderncss.dev/pure-css-custom-checkbox-style/
*/


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

	
	var replLabel = document.createElement('div')
	replLabel.innerHTML = "&nbsp";
	replLabel.style.display = "inline-block"
	replLabel.setAttribute('label', '')
	label.parentNode.replaceChild(replLabel, label);


	self._setLastValue(self.Value)


	input.addEventListener('change', (event) => {
		if (self.GetLastValue() != self.Value) {
			input.setAttribute('changed', 'true')
		} else {
			input.removeAttribute('changed')
		}
	});

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
	
	var editmode = self.Nodes.Input.getAttribute('editmode')
	var ineditmode = ((editmode==null || editmode=='' || editmode=='false')) ? false : true

	

	if (v) {
		self.Nodes.Input.setAttribute('permanent-disabled', 'true')
		self.Nodes.Caption.setAttribute('permanent-disabled', 'true')
	} else {
		self.Nodes.Input.removeAttribute('permanent-disabled')
		self.Nodes.Caption.removeAttribute('permanent-disabled')
		if (!ineditmode) {
			self.Nodes.Input.disabled = true	
		}
	}
}


function Checkbox_SetEditingMode(self, ineditmode) {
	var attrval = ineditmode ? 'true' : 'false'
	var permdisattr = self.Nodes.Input.getAttribute('permanent-disabled')
	var permanentDisabled = ((permdisattr==null || permdisattr=='' || permdisattr=='false')) ? false : true

	self.Nodes.Input.setAttribute('editmode', attrval)
	if (ineditmode) {
		if (permanentDisabled) {
			self.Nodes.Input.setAttribute('disabled', 'true')
		} else {
			self.Nodes.Input.removeAttribute('disabled')
		}
	} else {
		self.Nodes.Input.setAttribute('disabled', 'true')
	}
}

function Checkbox_setLastValue(self, v) {
	// console.log(`Checkbox '${self.Id}' set last value from '${self.Nodes.LastValue.value}' to '${v}'`)
	self.Nodes.LastValue.value = v
}