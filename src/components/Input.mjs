import Component from "./Component.mjs"

export default class Input extends Component {
	EditingMode = false;

	constructor(id) {
		super(id)
		Input_construct(this, id)
	}

	get type() { return this.constructor.name }

	get value() {}
	set value(v) {}

	SetEditingMode(editingmode) {} 
	SetError(msg) {}
	GetLastValue() {} 

	Validate() { return true }

}

function Input_construct(self, id) {

}

