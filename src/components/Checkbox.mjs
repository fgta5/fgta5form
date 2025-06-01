import Input from "./Input.mjs"


const CheckedEvent = (data)=>{ return new CustomEvent('checked', data) }
const UnCheckedEvent = (data)=>{ return new CustomEvent('unchecked', data) }

/*
* reference:
* https://moderncss.dev/pure-css-custom-checkbox-style/
*/


export default class Checkbox extends Input {

	constructor(id) {
		super(id)
		Checkbox_construct(this, id)
	}

	get Value() { return Checkbox_getValue(this) }
	set Value(v) {
		Checkbox_setValue(this, v)
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

	NewData(initialvalue) {
		super.NewData(initialvalue)
		Checkbox_NewData(this, initialvalue)
	}

	GetLastValue() {
		return Checkbox_GetLastValue(this)
	} 

	IsChanged() { 
		return Checkbox_IsChanged(this)
	}

	Reset() {
		Checkbox_Reset(this)
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
	const checkboxlabel = document.createElement("label")

	// tambahkan referensi elemen ke Nodes
	self.Nodes.Label = label 
	

	// setup input awal component
	input.parentNode.insertBefore(container, input)
	input.classList.add('fgta5-checkbox-input')
	
	// setup checkbox label untuk menampung checkbox
	checkboxlabel.classList.add('fgta5-checkbox')
	checkboxlabel.appendChild(input)
	checkboxlabel.appendChild(document.createTextNode(label.innerHTML))

	// setup container
	container.appendChild(checkboxlabel)
	container.appendChild(lastvalue)
	
	
	// ganti original label tag menjadi div 
	// karena label di form harus mereferensi ke input
	// sedangkan label di checkbox kita fungsikan sebagai text pada checkbox untuk di klik
	var replLabel = document.createElement('div')
	replLabel.innerHTML = "&nbsp";
	replLabel.style.display = "inline-block"
	replLabel.setAttribute('label', '')
	label.parentNode.replaceChild(replLabel, label);


	// inisialisasi last value
	self._setLastValue(self.Element.checked)


	// tambahkan event listener internal
	input.addEventListener('change', (event) => {
		Checkbox_checkedChanged(self)		
	});

	
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
	var lastvalue = 1
	if (v==='off' || v==='0' || v===0 || v===false) {
		lastvalue = 0
	}
	self.Nodes.LastValue.value = lastvalue
}


function Checkbox_checkedChanged(self) {
	var input = self.Nodes.Input
	input.value = input.checked ? 1 : 0
	if (self.GetLastValue() != self.Value) {
		input.setAttribute('changed', 'true')
	} else {
		input.removeAttribute('changed')
	}

	if (input.checked) {
		self.Listener.dispatchEvent(CheckedEvent({}))
	} else {
		self.Listener.dispatchEvent(UnCheckedEvent({}))
	}
}


function Checkbox_IsChanged(self) {
	var lastvalue = self.GetLastValue()
	var currentvalue = self.Value
	if (currentvalue!=lastvalue) {
		console.log(`Checkbox '${self.Id}' is changed from '${lastvalue}' to '${currentvalue}'`)
		return true
	} else {
		return false
	}
}



function Checkbox_getBoolValue(v) {
	if (v===0||v==='0'||v===false||v===undefined) {
		return false
	} else {
		return true
	}
}



function Checkbox_getValue(self) {
	return self.Element.checked
}

function Checkbox_setValue(self, v) {
	var checked = Checkbox_getBoolValue(v)
	self.Element.checked = checked

	Checkbox_markChanged(self)
}

function Checkbox_GetLastValue(self) {
	var lastvalue = self.Nodes.LastValue.value
	return Checkbox_getBoolValue(lastvalue)
}

function Checkbox_Reset(self) {
	var checked = self.GetLastValue()
	self.Nodes.Input.checked = checked
}


function Checkbox_NewData(self, initialvalue) {
	var checked = Checkbox_getBoolValue(initialvalue)
	self.Nodes.Input.checked = checked
	self._setLastValue(checked)
}

function Checkbox_markChanged(self) {
	var input = self.Nodes.Input
	if (self.Value!=self.GetLastValue()) {
		input.setAttribute('changed', 'true')
	} else {
		input.removeAttribute('changed')
	}
}