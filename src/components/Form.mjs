import Component from "./Component.mjs"
import Textbox from "./Textbox.mjs"
import Combobox from "./Combobox.mjs"
import Datepicker from "./Datepicker.mjs"


export default class Form extends Component {
	Inputs = {}
	Locked = false

	constructor(id) {
		super(id)
		Construct(this, id)
	}


	Lock(lock) { Form_Lock(this, lock) }

	Reset() { Form_Reset(this) }

	AcceptChanges() { Form_AcceptChanges(this) }

	IsChanged() { return Form_IsChanged(this) }

	NewData() { Form_NewData(this) }


	Render() { Form_Render(this) }

	Validate() { return Form_Validate(this) }

}


function Construct(self, id) {
	console.log(`construct form ${id}`)

	self.Id = id
 	self.Element = document.getElementById(id)
	self.Inputs = {}

	self.Element.addEventListener('submit', (event) => {
		event.preventDefault();
	});


	// ambil semua input
	var inputs = self.Element.querySelectorAll('input')
	for (var i = 0; i < inputs.length; i++) {
		var input = inputs[i]
		var fgtacomp = input.getAttribute('fgta5-component')
		if (fgtacomp==null || input.id==null || input.id=='') {
			continue
		}

		if (fgtacomp=='Textbox') {
			self.Inputs[input.id] = new Textbox(input.id)
		} else if (fgtacomp=='Combobox') {
			self.Inputs[input.id] = new Combobox(input.id)
		} else if (fgtacomp=='Datepicker') {
			self.Inputs[input.id] = new Datepicker(input.id)
		}
	}
}


function Form_Render(self) {
	console.log(`render form ${self.Id}`)
	var locked = self.Element.getAttribute('locked')
	if (locked.toLowerCase() === 'true') {
		self.Lock(true)
	}
}

function Form_Lock(self, lock) {
	const formLockedEvent = new CustomEvent('locked')
	const formUnLockedEvent = new CustomEvent('unlocked')

	self.Locked = lock
	var editmode = self.Locked ? false : true

	console.log((self.Locked ? "lock" : "unlock") + " semua input")
	for (var name in self.Inputs) {
		var obj = self.Inputs[name]
		obj.SetEditingMode(editmode)
	}

	if (lock) {
		self.Element.dispatchEvent(formLockedEvent)
	} else {
		self.Element.dispatchEvent(formUnLockedEvent)
	}
	
}

function Form_AcceptChanges(self) {
	console.log("accept changes")
	console.warn("accpet changes still not implemented")
}

function Form_Reset(self) {
	console.log("reset form ke state terakhir yang changed accepted")
	console.warn("reset still not implemented")
}


function Form_NewData(self) {
	console.log("new data, clear all data in forms")
	console.warn("newdata still not implemented")
}

function Form_IsChanged(self) {
	console.log('get form changed state')
	console.warn("IsChanges still not implemented, always return true")
	return true
} 

function Form_Validate(self) {
	var isValid = true
	for (var name in self.Inputs) {
		var obj = self.Inputs[name]
		isValid &&= obj.Validate()
	}
	return isValid
}
