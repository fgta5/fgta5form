import Component from "./Component.mjs"

const formLockedEvent = new CustomEvent('locked')
const formUnLockedEvent = new CustomEvent('unlocked')


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

}


function Construct(self, id, inputs) {
	self.Id = id
 	self.Element = document.getElementById(id)
	self.Inputs = inputs

	self.addEventListener('submit', (event) => {
		event.preventDefault();
	});


	

}


function Form_Lock(self, lock) {
	self.Locked = lock

	if (lock) {
		console.log("lock semua input")
		self.Element.dispatchEvent(formLockedEvent)
	} else {
		console.log("unlock semua input")
		self.Element.dispatchEvent(formUnLockedEvent)
	}
	
	for (var name in self.Inputs) {
		var obj = self.Inputs[name]
	}
}

function Form_AcceptChanges(self) {
	console.log("accept changes")
}

function Form_Reset(self) {
	console.log("reset form ke state terakhir yang changed accepted")
}

function Form_IsChanged(self) {
	console.log('get form changed state')
	return true
} 


function Form_NewData(self) {
	console.log('new data')
}