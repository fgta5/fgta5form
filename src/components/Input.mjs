import Component from "./Component.mjs"

export default class Input extends Component {
	EditingMode = false;

	constructor(id) {
		super(id)
		Input_construct(this, id)
	}

	get Type() { return this.constructor.name }

	
	get Value() { return this.Element.value }
	set Value(v) { this.Element.value = v }

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { this.Element.disabled = v }

	#_form
	get Form() { return this.#_form }
	set Form(v) { this.#_form = v }

	SetEditingMode(editingmode) {} 
	SetError(msg) {}
	GetLastValue() {} 

	Validate() { return true }

}

function Input_construct(self, id) {

}

