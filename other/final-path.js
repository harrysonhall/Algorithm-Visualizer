export default class FinalPath{

	constructor() {
		this.collection = [];
	}

	printCollection() {
		console.log(this.collection);
	};

	enqueue = function(element) {
		this.collection.push(element);

		element.cellType = "Path";
		element.isCellTypeSet = false;
	}

	dequeue(){
		let value = this.collection.shift();
		return value;
	};

	front() {
		return this.collection;
	};

	size() {
		return this.collection.length;
	};

	isEmpty() {
		return this.collection.length === 0;
	};

	getLength() {
		return this.collection.length;
	};

	contains(element) {

		let value = this.collection.includes(element)
		return value;
	};

	getFinalPath = function() {
		return this.collection;
	}

	resetCellType = function() {

		for(let nodeIndex = 0; nodeIndex < this.collection.length; nodeIndex++) {
		
			this.collection[nodeIndex].cellType = "Open";
			this.collection[nodeIndex].isCellTypeSet = false;
		}
	}
}