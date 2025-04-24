import Component from './components/Component.mjs';
import Form from './components/Form.mjs';
import Button from './components/Button.mjs';
import Textbox from './components/Textbox.mjs';
import Combobox from './components/Combobox.mjs';
import Datepicker from './components/Datepicker.mjs';
import {MessageBox, MessageBoxButton} from './components/MessageBox.mjs';
import Dialog from './components/Dialog.mjs';



const $fgta5 = {
	Component: Component,
	Form: Form,
	Button: Button,
	Textbox: Textbox,
	Combobox: Combobox,
	Datepicker: Datepicker,
	MessageBox: new MessageBox(),
	MessageBoxButton: MessageBoxButton,
	Dialog: new Dialog(),
}

export default $fgta5;
