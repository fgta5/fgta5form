const iconsCss = {
	'info': 'fgta5-messagebox-icon-info',
	'warning': 'fgta5-messagebox-icon-warning',
	'error': 'fgta5-messagebox-icon-error',
	'question': 'fgta5-messagebox-icon-question',
}

export class MessageBox {
	static async Show (message, config) { return await MessageBox_Show(this, message, config) }
	static async Error(message) { return await MessageBox_Error(this, message) }
	static async Info(message) { return await MessageBox_Info(this, message) }
	static async Warning(message) { return await MessageBox_Warning(this, message) }
	static async Confirm(message) { return await MessageBox_Confirm(this, message) }
}


export class MessageBoxButton {
	Text = 'button'
	
	constructor(text) {
		this.Text = text
	}

}


function Create(self, message, config) {
	const dialog = document.createElement('dialog')
    dialog.classList.add('fgta5-messagebox-dialog')

	dialog.addEventListener('close', (evt) => {
		dialog.parentNode.removeChild(dialog)
	});
	

    if (config.title) {
		dialog.divTitle = document.createElement('div')
		dialog.divTitle.classList.add('fgta5-messagebox-title')
		dialog.divTitle.innerHTML = config.title
		dialog.appendChild(dialog.divTitle)
    }

	if (config.iconcss) {
		var iconcss = iconsCss[config.iconcss] ? iconsCss[config.iconcss] : config.iconcss
		dialog.divIcon = document.createElement('div')
		dialog.divIcon.classList.add('fgta5-messagebox-icon')
		dialog.divIcon.classList.add(iconcss)
		dialog.appendChild(dialog.divIcon)
	}

	dialog.divContent = document.createElement('div')
	dialog.divContent.classList.add('fgta5-messagebox-content')
	dialog.divContent.innerHTML = message
	dialog.appendChild(dialog.divContent)

	dialog.divButtons = document.createElement('div')
	dialog.divButtons.classList.add('fgta5-messagebox-buttonsbar')
	dialog.appendChild(dialog.divButtons)
	
	document.body.appendChild(dialog)
	return dialog
}


async function MessageBox_Show(self, message, config) {
	if (config === undefined) config = {}

	var dialog = Create(self, message, config)
	return new Promise((resolve)=>{
		if (config.buttons) {
			for (const [key, btn] of Object.entries(config.buttons)) {
				const btnEl = document.createElement('button')
				btnEl.classList.add('fgta5-messagebox-button')
				btnEl.innerHTML = btn.Text
				btnEl.addEventListener('click', () => {
					dialog.close()
					resolve(key)
				})
				dialog.divButtons.appendChild(btnEl)
			}
		} else {
			const btnOk = document.createElement('button')
			btnOk.classList.add('fgta5-messagebox-button')
			btnOk.innerHTML = 'Ok'
			btnOk.addEventListener('click', () => {
				dialog.close()
				resolve('ok')
			})
			dialog.divButtons.appendChild(btnOk) 
		}
	
		dialog.showModal()
	});
}


async function MessageBox_Error(self, message) {
	return await MessageBox_Show(self, message, {iconcss: 'error'})
}

async function MessageBox_Info(self, message) {
	return await MessageBox_Show(self, message, {iconcss: 'info'})
}
async function MessageBox_Warning(self, message) {
	return await MessageBox_Show(self, message, {iconcss: 'warning'})
}
async function MessageBox_Confirm(self, message) {
	return await MessageBox_Show(self, message, {
		iconcss: 'question',
		buttons: {
			ok: new MessageBoxButton('Ok'),
			cancel: new MessageBoxButton('Cancel')
		}
	})
}