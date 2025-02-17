let counter = 0;

export default class Component {
	Id;
	Element;


	constructor(id) {
		if (id!=undefined) {
			this.Id = id
			this.Element = document.getElementById(id)
		}
	}
	
	addEventListener(event, callback) {
		this.Element.addEventListener(event, callback)
	}


	static GenerateId() {
		return `comp-${++counter}`;
	}
}

