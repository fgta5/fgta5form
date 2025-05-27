import Component from './components/Component.mjs';
import Form from './components/Form.mjs';
import Button from './components/Button.mjs';
import {MessageBox, MessageBoxButton} from './components/MessageBox.mjs';
import Modal from './components/Modal.mjs';
import * as Validators from './components/Validators.mjs';
import Textbox from './components/Textbox.mjs';
import Numberbox from './components/Numberbox.mjs';
import Checkbox from './components/Checkbox.mjs';	


const $fgta5 = {
	Component: Component,
	Form: Form,
	Button: Button,
	Textbox: Textbox,
	Numberbox: Numberbox,
	Checkbox: Checkbox,
	MessageBox: MessageBox,
	MessageBoxButton: MessageBoxButton,
	Modal: Modal
}

if (window.$validators === undefined) {
	window.$validators = Validators;
} else {
	Object.assign(window.$validators, Validators);
}

export default $fgta5;
