import Input from "./Input.mjs"

export default class Datepicker extends Input {
	constructor(id) {
		super(id)
		Datepicker_construct(this, id)
	}

	get Value() { return this.Element.value }
	set Value(v) {	
		this.Element.value = v
	}

	SetEditingMode(editingmode) {
		Datepicker_SetEditingMode(this, editingmode)
	}

}


function Datepicker_construct(self, id) {
	console.log(`construct datepicker ${id}`)

	const elContainer =document.createElement('div')
	const el = self.Element
	const lbl = document.querySelector(`label[for="${self.Id}"]`)
	const disp = document.createElement('input')
	const btn = document.createElement('button')
	const wrap =  document.createElement("div")

	
	
}

function Datepicker_SetEditingMode(self, editingmode) {
	self.EditingMode = editingmode

	

}