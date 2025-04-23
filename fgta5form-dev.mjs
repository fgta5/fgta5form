import $fgta5 from "./src/main.mjs"

const txtState = document.getElementById('txtState')


const btn_msgboxShow = new $fgta5.Button('btn_msgbox_show')
const btn_msgboxInfo = new $fgta5.Button('btn_msgbox_info')
const btn_msgboxWarn = new $fgta5.Button('btn_msgbox_warn')
const btn_msgboxError = new $fgta5.Button('btn_msgbox_error')
const btn_msgboxConfirm = new $fgta5.Button('btn_msgbox_confirm')




const btn_reset = new $fgta5.Button('btn_reset')
const btn_save = new $fgta5.Button('btn_save')
const btn_new = new $fgta5.Button('btn_new')
const btn_edittogle = new $fgta5.Button('btn_edittogle')

const btn_testvalidation = new $fgta5.Button('btn_testvalidation')
const btn_testdised = new $fgta5.Button('btn_testdised')
const btn_clearerror = new $fgta5.Button('btn_clearerror')

const form = new $fgta5.Form('myform');
const obj_txt_nama = form.Inputs.obj_txt_nama
// const obj_cbo_kota = form.Inputs.obj_cbo_kota
// const obj_dt_tanggal = form.Inputs.obj_dt_tanggal



export default class Page {
	async main(args) {
		await main(this, args)
	}
		
}


async function main(self, args) {
	console.log('starting module')

	btn_msgboxShow.addEventListener('click', (evt) => { btn_msgboxShow_click(self, evt) });
	btn_msgboxInfo.addEventListener('click', (evt) => { btn_msgboxInfo_click(self, evt) });
	btn_msgboxWarn.addEventListener('click', (evt) => { btn_rmsgboxWarn_click(self, evt) });
	btn_msgboxError.addEventListener('click', (evt) => { btn_msgboxError_click(self, evt) });
	btn_msgboxConfirm.addEventListener('click', (evt) => { btn_msgboxConfirm_click(self, evt) });




	btn_reset.addEventListener('click', (evt) => { btn_reset_click(self, evt) });
	btn_save.addEventListener('click', (evt) => { btn_save_click(self, evt) });
	btn_new.addEventListener('click', (evt) => { btn_new_click(self, evt) });
	btn_edittogle.addEventListener('click', (evt) => { btn_edittogle_click(self, evt) });

	btn_testvalidation.addEventListener('click', (evt) => { btn_testvalidation_click(self, evt) });
	btn_testdised.addEventListener('click', (evt) => { btn_testdised_click(self, evt) });
	btn_clearerror.addEventListener('click', (evt) => { btn_clearerror_click(self, evt) });

	form.addEventListener('locked', (evt) => { form_locked(self, evt) });
	form.addEventListener('unlocked', (evt) => { form_unlocked(self, evt) });
	form.Render()

}



async function btn_msgboxShow_click(self, evt) {
	var ret = await $fgta5.MessageBox.Show("ini messagebox ditampilkan", {
		iconsvg: '',
		title: 'MessageBox',
		buttons: {
			ok: $fgta5.MessageBoxButton('Ok'),
			cancel: $fgta5.MessageBoxButton('Cancel'),
		}
	})

	console.log(ret)
}

async function btn_msgboxInfo_click(self, evt) {
	$fgta5.MessageBox.Info("ini messagebox ditampilkan")
}

async function btn_rmsgboxWarn_click(self, evt) {

}

async function btn_msgboxError_click(self, evt) {

}

async function btn_msgboxConfirm_click(self, evt) {

}


function btn_edittogle_click(self, evt) {
	
	$fgta5.MessageBox.Show('test messagebox')
	
	// if (form.IsChanged()) {
		// alert('Ada perubahan data, silakan batalkan perubahan atau simpa data terlebih dahulu')
		// return
	// }


	// 	form.AcceptChanges()
	// } else {
	// 	form.Lock(!form.Locked) 
	// }




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