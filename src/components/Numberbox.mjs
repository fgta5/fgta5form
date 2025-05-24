import $fgta5 from "../main.mjs"
import Input from "./Input.mjs"


export default class Numberbox extends Input {

	constructor(id) {
		super(id)
		Numberbox_construct(this, id)
		Numberbox_readValidators(this)
	}
}

function Numberbox_construct(self, id) {

}


function Numberbox_readValidators(self) {

}