import Component from "./Component.mjs"

export default class Dialog extends Component {
	constructor(id) {
		console.log('Dialog')
		if (id!=undefined) {
			super(id)
		} else {
			var el = document.createElement('dialog')
			el.id = Component.GenerateId()
			document.body.appendChild(el)
			super(el.id)
		}
		Dialog_construct(this, id)
	}

	ShowModal() {
		Dialog_ShowModal(this)
	}

}


function Dialog_construct(self, id) {
	var dlg = self.Element
	
	const btnClose = document.createElement('button')
	btnClose.innerHTML = 'Close'
	btnClose.addEventListener('click', () => {
		dlg.close()
	})

	dlg.appendChild(btnClose)
}

function Dialog_ShowModal(self) {
	self.Element.showModal()
}