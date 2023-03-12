export default class ClosedQueue {

	constructor(){
		this.collection = [];
	}

	printCollection () {
		console.log(this.collection);
	};

	enqueue(element) {
		element.cellType = "ClosedSet";
		element.isCellTypeSet = false;
		this.collection.push(element);
		// console.log(this.getLength())
	}

	dequeue () {
		let value = this.collection.shift();
		return value;
	};

	front () {
		return this.collection;
	};

	size () {
		return this.collection.length;
	};

	isEmpty () {
		return this.collection.length === 0;
	};

	getLength () {
		return this.collection.length;
	};

	contains (element) {
		let value = this.collection.includes(element)
		return value;

	};

	getClosedQueue() {
		return this.collection;
	}

	resetCellType() {
		
		for(let nodeIndex = 0; nodeIndex < this.collection.length; nodeIndex++) {
		
			this.collection[nodeIndex].cellType = "Open";
			this.collection[nodeIndex].isCellTypeSet = false;
		}
		
	}
}


