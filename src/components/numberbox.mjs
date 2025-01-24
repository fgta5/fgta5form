import Fgta5ComponentBase from './componentbase.mjs'
import { TextboxElement } from './textbox.mjs'

export default function Fgta5Numberbox(elid) {
	let self = Fgta5ComponentBase('Fgta5Numberbox')
	let el = document.getElementById(elid)
	
	var baseClass = TextboxElement(self, el)
	let numberbox = Object.assign(el, baseClass)
	self.assignElementObject(numberbox)
	self.render = () => { render(numberbox) }

	console.log('test')
	construct(numberbox, baseClass)

	return numberbox
}

function render(numberbox) {
	numberbox.classList.add('fgta5-textbox') 
	numberbox.classList.add('fgta5-numberbox')
}


function construct(numberbox, baseClass) {
	baseClass.construct()

	console.log(numberbox.id, ': construct numberbox')
	// tambahan property dan method numberbox yang diturunkan dari baseClass Textbox disini


}