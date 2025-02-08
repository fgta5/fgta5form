const btn_edit = new $fgta5.Button('btn_edit')
const btn_lock = new $fgta5.Button('btn_lock')
const btn_reset = new $fgta5.Button('btn_reset')
const btn_save = new $fgta5.Button('btn_save')
const btn_new = new $fgta5.Button('btn_new')
const btn_edittogle = new $fgta5.Button('btn_edittogle')
const btn_nonaktif = new $fgta5.Button('btn_nonaktif')

const form = new $fgta5.Form('form', {
	txt_nama: new $fgta5.Textbox('obj_txt_nama'),
});

export default class Page {
	async main(args) {
		await main(this, args)
	}
		
}


async function main(self, args) {
	console.log('starting module')
	btn_edit.addEventListener('click', () => { btn_edit_click() });
	btn_lock.addEventListener('click', () => { btn_lock_click() });
	btn_reset.addEventListener('click', () => { btn_reset_click() });
	btn_save.addEventListener('click', () => { btn_save_click() });
	btn_new.addEventListener('click', () => { btn_new_click() });
	btn_edittogle.addEventListener('click', () => { btn_edittogle_click() });

	form.addEventListener('locked', () => { form_locked() });
	form.addEventListener('unlocked', () => { form_unlocked() });

	
}


function btn_edit_click() {
	console.log('btn_edit_click()')
	form.Lock(false)
}

function btn_lock_click() {
	console.log('btn_lock_click()')
	form.Lock(true)
}

function btn_reset_click() {
	console.log('btn_reset_click()')
	form.Reset()
}

function btn_save_click() {
	console.log('btn_save_click()')
	if (form.IsChanged()) {
		console.log('simpan data')
		form.AcceptChanges()
	}
}

function btn_new_click() {
	console.log('btn_new_click()')
	form.NewData()
}

function btn_edittogle_click() {
	form.Lock(!form.Locked) 
}


function form_locked() {
	console.log('form locked')
	btn_edit.Disabled = false
	btn_lock.Disabled = true
}

function form_unlocked() {
	console.log('form unlocked')
	btn_edit.Disabled = true
	btn_lock.Disabled = false
}