const txtState = document.getElementById('txtState')

const btn_reset = new $fgta5.Button('btn_reset')
const btn_save = new $fgta5.Button('btn_save')
const btn_new = new $fgta5.Button('btn_new')
const btn_edittogle = new $fgta5.Button('btn_edittogle')

const btn_testvalidation = new $fgta5.Button('btn_testvalidation')
const btn_testdised = new $fgta5.Button('btn_testdised')
const btn_clearerror = new $fgta5.Button('btn_clearerror')

const form = new $fgta5.Form('myform');
const obj_txt_nama = form.Inputs.obj_txt_nama



export default class Page {
	async main(args) {
		await main(this, args)
	}
		
}


async function main(self, args) {
	console.log('starting module')


	btn_edittogle.addEventListener('click', (evt) => { btn_edittogle_click(self, evt) });
	btn_reset.addEventListener('click', (evt) => { btn_reset_click(self, evt) });
	btn_save.addEventListener('click', (evt) => { btn_save_click(self, evt) });
	btn_new.addEventListener('click', (evt) => { btn_new_click(self, evt) });

	btn_testvalidation.addEventListener('click', (evt) => { btn_testvalidation_click(self, evt) });
	btn_testdised.addEventListener('click', (evt) => { btn_testdised_click(self, evt) });
	btn_clearerror.addEventListener('click', (evt) => { btn_clearerror_click(self, evt) });

	form.addEventListener('locked', (evt) => { form_locked(self, evt) });
	form.addEventListener('unlocked', (evt) => { form_unlocked(self, evt) });
	form.Render()

}




async function btn_edittogle_click(self, evt) {
	if (!form.IsLocked()) {
		// dalam posisi edit
		if (form.IsChanged()) {
			await $fgta5.MessageBox.Warning('Ada perubahan data, simpam data terlebih dahulu atau batalkan perubahan')
			return
		}
	}
	
	form.Lock(!form.IsLocked()) 
}


async function btn_reset_click(self, evt) {
	console.log('btn_reset_click()')
	if (form.IsChanged()) {
		var ret = await $fgta5.MessageBox.Confirm("data pada form berubah, apakah akan reset data?")
		if (ret=='ok') {
			form.Reset()
		}
	}
}

async function btn_save_click(self, evt) {
	console.log('btn_save_click()')
	form.AcceptChanges()

}

async function btn_new_click(self, evt) {
	console.log('btn_new_click()')
	var newdata = true;
	if (form.IsChanged()) {
		newdata = false
		var ret = await $fgta5.MessageBox.Confirm("data pada form berubah, apakah akan membuat data baru?")
		if (ret=='ok') {
			newdata = true
		}
	}


	if (newdata) {
		form.NewData()
		form.Lock(false)
	}
}




function form_locked(self, evt) {
	console.log('form locked')
	txtState.innerHTML = "View"
	btn_reset.Disabled = true 
	btn_save.Disabled = true
}

function form_unlocked(self, evt) {
	console.log('form unlocked')
	txtState.innerHTML = "Edit"
	btn_reset.Disabled = false 
	btn_save.Disabled = false
}



function btn_testvalidation_click(self, evt) {
	console.log('btn_testvalidation_click()')

	var isValid = form.Validate()
	if (!isValid) {	
		console.error('ada error, di default validation');
	} else {
		console.log('default validation passed');
	}

	if (!isValid) {
		return
	}

	console.log('Test Set Error')
	obj_txt_nama.SetError('error message')

}

function btn_testdised_click(self, evt) {
	console.log('btn_testdised_click()')
	for (var name in form.Inputs) {	
		var obj = form.Inputs[name]
		obj.Disabled = !obj.Disabled
	}
}

function btn_clearerror_click(self, evt) {
	console.log('btn_clearerror_click()')
	console.log('btn_testdised_click()')
	for (var name in form.Inputs) {	
		var obj = form.Inputs[name]
		obj.SetError(null)
	}
}