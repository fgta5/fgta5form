import Input from "./Input.mjs"


const button_icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg transform="translate(0 3)" width="12" height="12" stroke-linecap="round" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path transform="matrix(.8169 0 0 -.64538 10.987 14.119)" d="m11.299 11.275h-10.157l-10.157-1e-6 10.157-17.593 5.0786 8.7965z"/>
<rect x="1.3299" y="1.3721" width="21.348" height="21.348" ry="0" fill="none" stroke-width="2.27"/>
</svg>
`


export default class Combobox extends Input {

	constructor(id) {
		super(id)
		Combobox_construct(this, id)
	}

}


function Combobox_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const display = document.createElement('input')
	const button = document.createElement('button')
	const label = document.querySelector(`label[for="${id}"]`)
	const datalist = input.parentNode.querySelector(`datalist[for="${id}"]`)

	input.classList.add('fgta5-entry-input')
	input.parentNode.insertBefore(container, input)
	input.setAttribute('type', 'hidden')

	wrapinput.classList.add('fgta5-entry-input-wrapper')
	display.classList.add('fgta5-entry-display')
	button.classList.add('fgta5-entry-button-combobox')	
	button.innerHTML = button_icon

	wrapinput.appendChild(input)
	wrapinput.appendChild(display)
	wrapinput.appendChild(button)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)


	display.id = self.Id + '-display'
	display.required = input.required
	display.setAttribute('style', input.getAttribute('style') || '')
	display.setAttribute('type', 'text')
	display.setAttribute('fgta5-component', 'Combobox')


	label.setAttribute('for', display.id)

}