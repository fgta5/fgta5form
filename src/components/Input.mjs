import Component from "./Component.mjs"

export default class Input extends Component {
	/* Construct Input */
	constructor(id) {
		super(id)
		Input_construct(this, id)
		Input_readValidators(this)
	}
	
	/* mengembalikan nama class contructor, misalnya 'Textbox' */
	get Type() { return this.constructor.name }


	get Value() { return this.Element.value }
	set Value(v) { this.Element.value = v }

	get Disabled() { return this.Element.disabled }
	set Disabled(v) { this.Element.disabled = v }

	#_form
	get Form() { return this.#_form }
	bindForm(form) {
		this.#_form = form
	}

	#_ineditmode = true
	get InEditMode() { return this.#_ineditmode }
	SetEditingMode(ineditmode) { this.#_ineditmode = ineditmode }
	
	NewData(initialvalue) {
		Input_NewData(this, initialvalue)
	}

	AcceptChanges() {
		Input_AcceptChanges(this)
	}
	
	Reset() {
		Input_Reset(this)
	}
	
	IsChanged() { 
		return Input_IsChanged(this)
	}

	SetError(msg) {
		Input_SetError(this, msg)
	}

	_setLastValue(v) {
		Input_setLastValue(this, v)
	}

	GetLastValue() {
		return Input_GetLastValue(this)
	} 


	GetBindingData() {
		var binding = this.Element.getAttribute('binding')
		if (binding === null) {
			return null
		} else {
			return binding
		}
	}

	Validate() { 
		// console.log(`Validating input '${this.Id}'`)
		return Input_Validate(this) 
	}

	#_validators = {}
	get Validators() { return this.#_validators }
	AddValidator(fnName, fnParams, message) {
		this.#_validators[fnName] = {
			param: fnParams,
			message: message
		}
	}
	RemoveValidator(str) {
		if (this.#_validators[str] !== undefined) {
			delete this.#_validators[str]
		}			
	}

	_setupDescription() {
		var description = this.Element.getAttribute('description')
		if (description !== null && description.trim() !== '') {
			description = description.trim()
			const decrdiv = document.createElement('div')
			decrdiv.classList.add('fgta5-entry-description')
			decrdiv.innerHTML = description
			this.Nodes.Container.appendChild(decrdiv)
		}		
	}


}

function Input_construct(self, id) {
	const container = document.createElement('div')
	const lastvalue = document.createElement('input')

	lastvalue.setAttribute('type', 'hidden') 
	lastvalue.classList.add('fgta5-entry-lastvalue')

	container.classList.add('fgta5-entry-container')

	self.Element.getInputCaption = () => {
		return self.Id;
	}


	self.Listener = new EventTarget()
	self.Nodes = {
		Input: self.Element,
		Container: container,
		LastValue: lastvalue,
	}



}


function Input_SetError(self, msg) {
	var errdiv = self.Nodes.Container.querySelector('.fgta5-entry-error')
	if (msg!== null && msg !== '') {
		self.Nodes.Input.setAttribute('invalid', 'true')
		if (!errdiv) {
			 errdiv = document.createElement('div')
			 errdiv.classList.add('fgta5-entry-error')
			 self.Nodes.Container.insertBefore(errdiv, self.Nodes.InputWrapper.nextSibling)
		}
		errdiv.innerHTML = msg
	} else {
		self.Nodes.Input.removeAttribute('invalid')
		if (errdiv) {
			errdiv.remove()
		}
	}
}


function Input_setLastValue(self, v) {
	// console.log(`Input '${self.Id}' set last value from '${self.Nodes.LastValue.value}' to '${v}'`)
	self.Nodes.LastValue.value = v
}

function Input_GetLastValue(self) {
	return self.Nodes.LastValue.value
}

function Input_NewData(self, initialvalue) {
	if (initialvalue === undefined || initialvalue === null) {
		initialvalue = ''
	} else if (initialvalue instanceof Date) {
		initialvalue = initialvalue.toISOString().split("T")[0]
	} else if (typeof initialvalue !== 'string') {
		initialvalue = String(initialvalue)
	}
	
	// var initialvalue = ""
	self.Value = initialvalue
	self._setLastValue(self.Value)
	self.SetError(null)
}

function Input_AcceptChanges(self) {
	self._setLastValue(self.Value)
	self.Nodes.Input.removeAttribute('changed')
	self.SetError(null)
}

function Input_Reset(self) {
	self.Value = self.GetLastValue()
	self.Nodes.Input.removeAttribute('changed')
	self.SetError(null)
}

function Input_IsChanged(self) {
	if (self.GetLastValue() != self.Value) {
		console.log(`Input '${self.Id}' is changed from '${self.GetLastValue()}' to '${self.Value}'`)
		return true
	} else {
		return false
	}
}


function Input_Validate(self) {
	for (const [fnName, args] of Object.entries(self.Validators)) {
		const fnValidate = $validators[fnName];
		const fnParams = args.param;
		const fnMessage = args.message;

		try {
			if (typeof fnValidate !== 'function') {
				var err = new Error(`Validator function '${fnName}' is not defined or not a function`)
				console.error(err);
				throw err
			}

			if (fnName=='mindate') {
				var t = 0
			}


			var valid = fnValidate(self.Value, fnParams)
			if (!valid) {
				var err = new Error( `Invalid value '${self.Value}' for '${self.Nodes.Input.getInputCaption()}' using validator '${fnName}(${fnParams??''})'` )
				console.log(err.message);

				var msg = fnMessage
				if (msg === null || msg === '') {
					msg = err.message
				}
				throw new Error(msg)
			}
		} catch(err) {
			self.SetError(err.message)
			return false
		}
	}

	return true
}



function Input_readValidators(self) {
	const cname = self.Nodes.Input.getAttribute('fgta5-component')
	var default_invalid_message = self.Nodes.Input.getAttribute(`invalid-message`)

	var required = self.Nodes.Input.getAttribute('required')
	if (required != null) {
		if (required.toLowerCase() !== 'false') {
			var msg = window.$validators.getInvalidMessage('required', self.Nodes.Input, default_invalid_message)
			self.AddValidator('required', null, msg)
		}
	}

	var minlength = self.Nodes.Input.getAttribute('minlength')
	if (minlength != null) {
		minlength = parseInt(minlength)
		if (!isNaN(minlength)) {
			var msg = window.$validators.getInvalidMessage('minlength', self.Nodes.Input, default_invalid_message)
			self.AddValidator('minlength', minlength, msg)
		}
	}

	var maxlength = self.Nodes.Input.getAttribute('maxlength')
	if (maxlength != null) {
		maxlength = parseInt(maxlength)
		if (!isNaN(maxlength)) {
			var msg = window.$validators.getInvalidMessage('maxlength', self.Nodes.Input, default_invalid_message)
			self.AddValidator('maxlength', maxlength, msg)
		}
	}

	var pattern = self.Nodes.Input.getAttribute('pattern')
	if (pattern != null) {
		if (pattern.trim() !== '') {
			var msg = window.$validators.getInvalidMessage('pattern', self.Nodes.Input, default_invalid_message)
			self.AddValidator('pattern', pattern, msg)
		}
	}


	var min = self.Nodes.Input.getAttribute('min')
	if (min != null) {
		if (cname=="Datepicker") {
			var mindate = new Date(min)
			var msg = window.$validators.getInvalidMessage('min', self.Nodes.Input, default_invalid_message)
			self.AddValidator('mindate', mindate, msg)
		} else if (cname=="Timepicker") {
			var mintime = min
			var msg = window.$validators.getInvalidMessage('min', self.Nodes.Input, default_invalid_message)
			self.AddValidator('mintime', mintime, msg)
		} else {
			min = parseInt(min)
			if (!isNaN(min)) {
				var msg = window.$validators.getInvalidMessage('min', self.Nodes.Input, default_invalid_message)
				self.AddValidator('min', min, msg)
			}
		}
	}

	var max = self.Nodes.Input.getAttribute('max')
	if (max != null) {
		if (cname=="Datepicker") {
			var maxdate = new Date(max)
			var msg = window.$validators.getInvalidMessage('max', self.Nodes.Input, default_invalid_message)
			self.AddValidator('maxdate', maxdate, msg)
		} else if (cname=="Timepicker") {
			var maxtime = max
			var msg = window.$validators.getInvalidMessage('max', self.Nodes.Input, default_invalid_message)
			self.AddValidator('maxtime', maxtime, msg)
		} else {
			max = parseInt(max)
			if (!isNaN(max)) {
				var msg = window.$validators.getInvalidMessage('max', self.Nodes.Input, default_invalid_message)
				self.AddValidator('max', max, msg)
			}
		}
	}


	var validator = self.Nodes.Input.getAttribute('validator')
	if (validator != null && validator.trim() !== '') {
		validator = validator.split(',')
		for (var i=0; i<validator.length; i++) {
			var str = validator[i].trim()
			var { fnName, fnParams } = $fgta5.Validators.parseFunctionParam(str)
			var msg = window.$validators.getInvalidMessage('pattern', self.Nodes.Input, default_invalid_message)
			self.AddValidator(fnName, fnParams, msg)
		}
	}
}