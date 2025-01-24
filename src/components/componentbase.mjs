let Elements = []


export default function Fgta5ComponentBase(typename) {
	let self = {
		Type: typename,
	}

	self.assignElementObject = (obj) => { assignElementObject(self, obj) }
	return self
}

export function getElements() {
	return Elements
}


function assignElementObject(self, obj) {
	obj.getSelf = () => { return self }	
	obj.getComponentType = () => { return self.Type }
	self.Element = obj

	Elements.push(self)
}
