export class MessageBox {
	async Show (message, config) { return await MessageBox_Show(this, message, config) }
	async Error(message) { return await MessageBox_Show(this, message) }
	async Info(message) { return await MessageBox_Show(this, message) }
	async Warning(message) { return await MessageBox_Show(this, message) }
	async Confirm(message) { return await MessageBox_Show(this, message) }
}


export class MessageBoxButton {
	constructor(text) {

	}


}


function CreateDialog(self, message, config) {
	const dialog = document.createElement('dialog')
	dialog.innerHTML = message

	
	document.body.appendChild(dialog)
	return dialog
}


async function MessageBox_Show(self, message, config) {
	var dialog = CreateDialog(self, message, config)
	return new Promise((resolve)=>{
		const btnClose = document.createElement('button')
		btnClose.innerHTML = 'Close'
		btnClose.addEventListener('click', () => {
			dialog.close()
			resolve(true)
		})
		dialog.appendChild(btnClose) 
		dialog.showModal()
	});
}

