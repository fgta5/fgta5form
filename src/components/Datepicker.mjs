import Input from "./Input.mjs"


export default class Datepicker extends Input {

	constructor(id) {
		super(id)
		Datepicker_construct(this, id)
	}

}

function Datepicker_construct(self, id) {
	const container = self.Nodes.Container
	const lastvalue = self.Nodes.LastValue
	const input = self.Nodes.Input
	const wrapinput = document.createElement('div')
	const display = document.createElement('input')
	const button = document.createElement('button')
	const label = document.querySelector(`label[for="${id}"]`)

	input.parentNode.insertBefore(container, input)
	

	wrapinput.classList.add('fgta5-entry-input-wrapper')
	display.classList.add('fgta5-entry-display')
	display.classList.add('fgta5-entry-display-datepicker')
	button.classList.add('fgta5-entry-button-datepicker')	

	wrapinput.appendChild(display)
	wrapinput.appendChild(button)
	button.appendChild(input)
	container.appendChild(wrapinput)
	container.appendChild(lastvalue)

	display.setAttribute('type', 'text')
	display.setAttribute('fgta5-component', 'Datepicker')
	display.setAttribute('readonly', 'true')

	var placeholder = input.getAttribute('placeholder')
	if (placeholder!=null && placeholder !='') {
		display.setAttribute('placeholder', placeholder)
	}

	var cssclass = input.getAttribute('class')
	if (cssclass!=null && cssclass !='') {
		display.setAttribute('class', cssclass)
	}
	
	var cssstyle = input.getAttribute('style')
	if (cssstyle!=null && cssstyle !='') {
		display.setAttribute('style', cssstyle)
	}

	
	input.setAttribute('type', 'date')
	input.removeAttribute('class')
	input.removeAttribute('style')
	input.classList.add('fgta5-entry-input')
	
	
	

	

	button.id = self.Id + '-button'


	label.setAttribute('for', button.id)
}