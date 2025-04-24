import Component from "./Component.mjs"

export default class Dialog  {
	static Show (content) { return Dialog_Show(content) }
	static Mask (message) { return Dialog_Mask(message) }
	static Progress (config) { return Dialog_Progress(config) }
}


function CreateDialog() {
	const dialog = document.createElement('dialog')
	dialog.classList.add('fgta5-dialog')
	dialog.addEventListener('close', (evt) => {
		dialog.parentNode.removeChild(dialog)
	});
	document.body.appendChild(dialog)
	dialog.showModal()
	return dialog
}


function Dialog_Show(content) {
	const dialog = CreateDialog()
	return dialog
}

function Dialog_Mask(message) {
	const dialog = CreateDialog()
	dialog.innerHTML = message	
	return dialog
}


function Dialog_Progress(config) {
	if (config === undefined) config = {}
	

	const dialog = CreateDialog()

	dialog.IsError = false
	

	var prgBarErrIcon = document.createElement('div')
	dialog.appendChild(prgBarErrIcon)

	var prgBarContainer = document.createElement('div')
	prgBarContainer.classList.add('fgta5-progressbar-container')
	dialog.appendChild(prgBarContainer)

	var prgBar = document.createElement('label')
	prgBar.classList.add('fgta5-progressbar')
	prgBarContainer.appendChild(prgBar)

	var prgMsg = document.createElement('div')
	prgMsg.classList.add('fgta5-progressbar-text')
	dialog.appendChild(prgMsg)

	dialog.setProgress = function (progress, message) {
		if (progress > 100) progress = 100
		prgBar.innerHTML = `${progress}%`
		prgBar.style.width = `${progress}%`
		prgMsg.innerHTML = message
	}


	dialog.setError = function (message) {
		dialog.IsError = true

		prgBarErrIcon.classList.add('fgta5-icon-error')
		prgBarErrIcon.style.height = '32px'
		prgBarErrIcon.style.marginBottom = '10px'

		prgMsg.innerHTML = message
		prgMsg.setAttribute('error', 'true')
		prgBar.setAttribute('error', 'true')
	}

	dialog.finish = function (text, completed) {
		if (text===undefined) text = 'Done'
		if (completed===undefined) completed = true

		if (config.buttonClose===true || dialog.IsError) {
			if (completed) {
				prgMsg.style.display = 'none'
				prgBar.style.width = '100%'
				prgBar.innerHTML = '100%'
			}

			var div = document.createElement('div')
			div.style.textAlign = 'center'
			div.style.marginTop = '10px'
			div.style.marginBottom = '0'
			var btn = document.createElement('button')
			btn.classList.add('fgta5-dialog-button')
			btn.innerHTML = text
			btn.addEventListener('click', () => {
				dialog.close()
			})
			div.appendChild(btn)
			dialog.appendChild(div)
		} else {
			dialog.close()
		}
	}

	return dialog
}

