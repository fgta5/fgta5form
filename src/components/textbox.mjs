import Fgta5ComponentBase from './componentbase.mjs'


export default function Fgta5Textbox(elid) {
	let self = Fgta5ComponentBase('Fgta5Textbox')
	let el = document.getElementById(elid)
	
	var baseClass = TextboxElement(self, el)
	let textbox = Object.assign(el, baseClass)
	self.assignElementObject(textbox)
	self.render = () => { render(textbox) }

	construct(textbox, baseClass)
	
	return textbox
}

function render(textbox) {
	textbox.classList.add('fgta5-textbox')
}


function construct(textbox, baseClass) {
	console.log(textbox.id, ': construct textbox')
	




}

export function TextboxElement(self, el) {
	return {
		construct: () => {
			// Mencegah aksi default (submit form)
			el.addEventListener('keydown', function(event) {
				if (event.key === 'Enter') {
					event.preventDefault();  
				}
			});		

			el.setEditMode = (editmode) => {
				textbox_setEditMode(self, editmode)
			}

			el.isEditMode = () => {
				return textbox_isEditMode(self)
			}
			
		},

		

		
	}
}


function textbox_setEditMode(self, editmode) {
	var el = self.Element
	console.log(el.id, ': set textbox edit mode', editmode)

	if (editmode==true) {
		el.readOnly = false
	} else {
		el.readOnly = true
	}
}

function textbox_isEditMode(self) {
	var el = self.Element
	return !el.readOnly
}