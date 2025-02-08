import Component from "./Component.mjs"

export default class Button extends Component {
	constructor(id) {
		super(id)
		Construct(this, id)
	}

	#_disabled = false
	get Disabled() { return this.#_disabled }
	set Disabled(v) {
		this.#_disabled = v
		Button_setDisabled(this, v)
	}

}

function Construct(self, id) {
	self.Element.classList.add('fgta5-button')
}

function Button_setDisabled(self, disabled) {
	self.Element.disabled = disabled
}