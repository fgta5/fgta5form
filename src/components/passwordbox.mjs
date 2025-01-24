import Fgta5ComponentBase from './componentbase.mjs'
import { TextboxElement } from './textbox.mjs'

export default function Fgta5Passwordbox(elid) {
	let self = Fgta5ComponentBase('Fgta5Passwordbox')
	let el = document.getElementById(elid)
	
	var baseClass = TextboxElement(self, el)
	let passwordbox = Object.assign(el, baseClass)
	self.assignElementObject(passwordbox)
	self.render = () => { render(passwordbox) }

	construct(passwordbox, baseClass)


	return passwordbox
}

function render(passwordbox) {
	passwordbox.classList.add('fgta5-textbox')
	passwordbox.classList.add('fgta5-passwordbox')
}


function construct(passwordbox, baseClass) {
	baseClass.construct()
	
	console.log(passwordbox.id, ': construct passwordbox')
	// tambahan property dan method numberbox yang diturunkan dari baseClass Textbox disini

}