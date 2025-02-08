export default class Component {
	Id;
	Element;

	constructor(id) {
		this.Id = id
		this.Element = document.getElementById(id)
	}
	
	addEventListener(event, callback) {
		this.Element.addEventListener(event, callback)
	}


}

