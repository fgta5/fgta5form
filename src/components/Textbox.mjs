import Input from "./Input.mjs"


export default class Textbox extends Input {

	constructor(id) {
		super(id)
		Textbox_construct(this, id)
	}
}



function Textbox_construct(self, id) {
	const container = document.createElement('div')
	const wrapdisp = document.createElement('div')
	const wrapinput = document.createElement('div')
	const input = self.Element
	const display = document.createElement('input')
	const lastvalue = document.createElement('input')

	const lbl = document.querySelector(`label[for="${self.Id}"]`)
	const btn = document.createElement('button')
}

