import Component from "./Component.mjs"

export default class Input extends Component {

	constructor(id) {
		super(id)
		Input_construct(this, id)
	}

	/* mengembalikan nama class contructor, misalnya 'Textbox' */
	get Type() { return this.constructor.name }


	get Value() { return this.Element.value }
	set Value(v) { this.Element.value = v }

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { this.Element.disabled = v }

	#_form
	get Form() { return this.#_form }
	bindForm(form) {
		this.#_form = form
	}

	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) { this.#_ineditmode = ineditmode }
	
	NewData() {}
	AcceptChanges() {}
	Reset() {}
	IsChanged() { return false }


	SetError(msg) {}
	GetLastValue() {} 

	Validate() { return true }



}

function Input_construct(self, id) {

}

