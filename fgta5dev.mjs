const btn_reset = new $fgta5.Button('btn_reset')
const btn_save = new $fgta5.Button('btn_save')
const btn_new = new $fgta5.Button('btn_new')
const btn_edittogle = new $fgta5.Button('btn_edittogle')
const btn_nonaktif = new $fgta5.Button('btn_nonaktif')

const btn_testvalidation = new $fgta5.Button('btn_testvalidation')

const form = new $fgta5.Form('form', {
	txt_nama: new $fgta5.Textbox('obj_txt_nama'),
	txt_kota: new $fgta5.Combobox('obj_txt_kota'),
});

export default class Page {
	async main(args) {
		await main(this, args)
	}
		
}


async function main(self, args) {
	console.log('starting module')
	btn_reset.addEventListener('click', (evt) => { btn_reset_click(self, evt) });
	btn_save.addEventListener('click', (evt) => { btn_save_click(self, evt) });
	btn_new.addEventListener('click', (evt) => { btn_new_click(self, evt) });
	btn_edittogle.addEventListener('click', (evt) => { btn_edittogle_click(self, evt) });

	btn_testvalidation.addEventListener('click', (evt) => { btn_testvalidation_click(self, evt) });



	form.addEventListener('locked', (evt) => { form_locked(self, evt) });
	form.addEventListener('unlocked', (evt) => { form_unlocked(self, evt) });
	form.Render()
	

	form.Inputs.txt_nama.addEventListener('change', (evt) => {
		var value = form.Inputs.txt_nama.value
		
		console.log(value)
		if (value=='error') {
			form.Inputs.txt_nama.SetError('ini isinya error')
		} else {
			form.Inputs.txt_nama.SetError(null)
		}
	});
}


function btn_reset_click(self, evt) {
	console.log('btn_reset_click()')
	form.Reset()
}

function btn_save_click(self, evt) {
	console.log('btn_save_click()')
	if (form.IsChanged()) {
		form.AcceptChanges()
	}
}

function btn_new_click(self, evt) {
	console.log('btn_new_click()')
	form.NewData()

	form.Lock(false)
}

function btn_edittogle_click(self, evt) {
	form.Lock(!form.Locked) 
}


function form_locked(self, evt) {
	console.log('form locked')
	btn_reset.Disabled = true 
	btn_save.Disabled = true
}

function form_unlocked(self, evt) {
	console.log('form unlocked')
	btn_reset.Disabled = false 
	btn_save.Disabled = false
}



function btn_testvalidation_click(self, evt) {
	console.log('btn_testvalidation_click()')

	form.Inputs.txt_nama.Validate()
}