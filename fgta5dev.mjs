const form = $fgta5.Form('form', {
	txt_nama: $fgta5.Textbox('obj_txt_nama'),
	txt_password: $fgta5.Passwordbox('obj_txt_password'),
	txt_number: $fgta5.Numberbox('obj_txt_number'),
	chk_check: $fgta5.Checkbox('obj_chk_check'),
});

const btn_new = $fgta5.Button('btn_new')
const btn_save = $fgta5.Button('btn_save')
const btn_reset = $fgta5.Button('btn_reset')
const btn_edit = $fgta5.Button('btn_edit')




export async function main() {
	console.log('starting module')
	await $fgta5.render();

	
	btn_new.addEventListener('click', () => { btn_new_click() });
	btn_save.addEventListener('click', () => { btn_save_click() });
	btn_reset.addEventListener('click', () => { btn_reset_click() });
	btn_edit.addEventListener('click', () => { btn_edit_click()});
	
}

function btn_new_click() {

}

function btn_save_click() {
	form.submit();
}

function btn_reset_click() {

}

function btn_edit_click() {

}

