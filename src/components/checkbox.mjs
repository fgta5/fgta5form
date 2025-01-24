import Fgta5ComponentBase from './componentbase.mjs'


export default function Fgta5Checkbox(elid) {
	let self = Fgta5ComponentBase('Fgta5Checkbox')
	let checkbox = document.getElementById(elid)

	self.assignElementObject(checkbox)
	self.render = () => { render(checkbox) }

	construct(checkbox)

	return checkbox
}


function render(checkbox) {
	checkbox.classList.add('fgta5-checkbox')
}

function construct(checkbox) {

	checkbox.setEditMode = (editmode) => {
		console.log('set checkbox edit mode', editmode)
	}
}