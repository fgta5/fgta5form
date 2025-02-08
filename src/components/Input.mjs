import Component from "./Component.mjs"

export default class Input extends Component {
	EditingMode = false;

	constructor(id) {
		super(id)
		Input_construct(this, id)
	}

	get Value() {}
	set Value(v) {}
	SetEditingMode(editingmode) {} 
	GetLastValue() {} 

}

function Input_construct(self, id) {

}

