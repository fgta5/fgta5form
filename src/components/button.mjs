import Fgta5ComponentBase from './componentbase.mjs'

export default function Fgta5Button(elid) {
	let self = Fgta5ComponentBase('Fgta5Button')
	let button = document.getElementById(elid)
	self.assignElementObject(button)
	self.render = () => { render(button) }

	return button
}


function render(button) {
	button.classList.add('fgta5-button')
}