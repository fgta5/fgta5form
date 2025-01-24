import Fgta5ComponentBase from './componentbase.mjs'
import crc32 from '../crc32.mjs'	

export default function Fgta5Form(elid, comps) {
	let self = Fgta5ComponentBase('Fgta5Form')
	let form = document.getElementById(elid)
	self.assignElementObject(form)
	self.render = () => { render(form) }
	self.checksum = null
	self.editmode = true
	

	form.Components = comps;

	form.isChanged = () => { return form_isChanged(self) }
	form.acceptChanges = () => { return form_acceptChanges(self) }
	form.getJson = () => { return form_getJson(self) }
	form.setEditMode = (mode) => { return form_setEditMode(self, mode) }
	form.isEditMode = () => { return form_isEditMode(self) }
	form.submit = () => {}

	// batalkan seluruh event submit
	form.addEventListener('submit', function(event) {
		event.preventDefault();
	});

	return form;
}

function render(form) {
	var editmode = form.getAttribute('editmode').toLowerCase() === 'true';
	for (let cname in form.Components) {
		var el = form.Components[cname]
		el.setEditMode(editmode)
	}
}


function form_isChanged(self) {
	var json = form_getJson(self)
	var currentchecksum = crc32(json)

	if (currentchecksum!=self.checksum) {
		return true
	} else {
		return false
	}
}

function form_acceptChanges(self) {
	var json = form_getJson(self)
	var checksum = crc32(json)
	self.checksum = checksum
}

function form_getJson(self) {
	var obj = {}
	for (let cname in self.Element.Components) {
		var el = self.Element.Components[cname]
		var value = el.value
		var type = el.getSelf().Type

		if (['Fgta5Textbox', 'Fgta5Passwordbox'].includes(type)) {
			value = value.trim()
		} else {
			value = value
		}

		obj[cname] = value
		
	}

	return JSON.stringify(obj)
}

function form_setEditMode(self, editmode) {
	for (let cname in self.Element.Components) {
		var el = self.Element.Components[cname]
		el.setEditMode(editmode)
	}
	self.editmode = editmode
}

function form_isEditMode(self) {
	return self.editmode
}