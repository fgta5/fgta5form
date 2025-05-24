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

	GetBindingName() {
		var binding = this.Element.getAttribute('binding')
		if (binding === null) {
			return null
		} else {
			return binding
		}
	}

	Validate() { return true }

	#_validators = {}
	get Validators() { return this.#_validators }
	AddValidator(fnName, fnParams) {
		this.#_validators[fnName] = fnParams
	}
	RemoveValidator(str) {
		if (this.#_validators[str] !== undefined) {
			delete this.#_validators[str]
		}			
	}
}

function Input_construct(self, id) {

}




