import Input from "./Input.mjs"
import { customValidation, textLengthValidation } from "../validator.mjs"


export default class Combobox extends Input {
	constructor(id) {
		super(id)
		Combobox_construct(this, id)
	}

}

function Combobox_construct(self, id) {
	const elContainer =document.createElement('div')
	const elDisplay = document.createElement('input')


	elDisplay.setAttribute('type', 'text')
	elDisplay.classList.add('fgta5-textbox')


	self.Wrapper = document.createElement("div")
	self.Element.setAttribute('type', 'hidden') // sembunyikan input utama, nanti diganti dengan textbox untuk display value
	self.Label = document.querySelector(`label[for="${self.Id}"]`) // ambil label dari input ini

	self.Element.parentNode.insertBefore(self.Wrapper, self.Element)

	// Pindahkan input ke dalam div
	self.Wrapper.appendChild(self.Element);
	self.Wrapper.classList.add('fgta5-wrapper-textbox')	

	// masukkan text wrapper ke dalam container
	self.Wrapper.parentNode.insertBefore(elContainer, self.Wrapper)
	elContainer.appendChild(self.Wrapper)
	elContainer.classList.add('fgta5-input-container')

	
}