import { getElements } from './components/componentbase.mjs';
import cTextbox from './components/textbox.mjs';
import cNumberbox from './components/numberbox.mjs';
import cPasswordbox from './components/passwordbox.mjs'
import cButton from './components/button.mjs';
import cCheckbox from './components/checkbox.mjs';
import cForm from './components/form.mjs'


export const $fgta5 = {
	Textbox: cTextbox,
	Numberbox: cNumberbox,
	Passwordbox: cPasswordbox,
	Button: cButton,
	Checkbox: cCheckbox,
	Form: cForm,
	
	render: async () => {
		return await fgta5_render()
	}
};


async function fgta5_render() {
	let elements = getElements();
	for (let el of elements) {
		el.render()
	}
}

