import Component from "./Component.mjs"


export default class Form extends Component {
	Inputs = {}
	Locked = false

	constructor(id, inputs) {
		super(id)
		Construct(this, id, inputs)
	}

	Lock(lock) { Form_Lock(this, lock) }

	Reset() { Form_Reset(this) }

	AcceptChanges() { Form_AcceptChanges(this) }

	IsChanged() { return Form_IsChanged(this) }

	NewData() { Form_NewData(this) }


	Render() { Form_Render(this) }
}


function Construct(self, id, inputs) {
	self.Id = id
 	self.Element = document.getElementById(id)
	self.Inputs = inputs

	self.Element.addEventListener('submit', (event) => {
		event.preventDefault();
	});

	
}


function Form_Render(self) {
	console.log('render form')
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
}

function Form_Reset(self) {
	console.log("reset form ke state terakhir yang changed accepted")
}


function Form_NewData(self) {
	console.log("new data, clear all data in forms")
}

function Form_IsChanged(self) {
	console.log('get form changed state')
	return true
} 

