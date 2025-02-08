import Input from "./Input.mjs"

export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)

	}

	SetEditingMode(editingmode) {
		Textbox_SetEditingMode(this, editingmode)
	}


}

function Textbox_construct(self, id) {

}

function Textbox_SetEditingMode(self, editingmode) {
	self.EditingMode = editingmode
}
