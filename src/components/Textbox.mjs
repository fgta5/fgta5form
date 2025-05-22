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
	const lstvalue = document.createElement('input')
	const label = document.querySelector(`label[for="${self.Id}"]`)
	const button = document.createElement('button')

	// style dari fgta5form-entry.css
	container.classList.add('fgta5-entry-container')


	wrapdisp.classList.add('fgta5-entry-display')
	wrapdisp.classList.add('fgta5-entry-display')
	wrapinput.classList.add('fgta5-entry-input')
	input.classList.add('fgta5-entry-input')
	display.classList.add('fgta5-entry-display')
	lstvalue.classList.add('fgta5-entry-input')
	button.classList.add('fgta5-entry-button')

}

