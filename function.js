
export function PriorityQueue() {
	let collection = [];

	this.printCollection = function() {
		console.log(collection)
	}

	this.enqueue = function(element) {
		if(this.isEmpty()) {
			collection.push(element)
		} else {
			let added = false;
			for(let i = 0; i < collection.length; i++){
				if(element[1] < collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
			}
			if(!added) {
				collection.push(element)
			} 
		}
	};

	this.enqueueByHcost = function(element) {
		if(this.isEmpty()) {
			collection.push(element)
		} else {
			let added = false;
			for(let i = 0; i < collection.length; i++){
				if(element[1] < collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
				if(element[1] === collection[i][1]) {
					if(element[2] < collection[i][2]) {
						collection.splice(i, 0, element);
						added = true;
						break;
					}
				}
				// console.log(element[2], collection[i][2])
			}
			if(!added) {
				collection.push(element)
			} 
		}
	};


	this.dequeue = function() {
		let value = collection.shift();
		return value[0];
	}

	this.front = function() {
		return collection[0];
	}

	this.size = function() {
		return collection.length;
	}

	this.isEmpty = function() {
		return (collection.length === 0);
	}

	this.contains = function(element) {
		if(this.isEmpty()) {
			return false;
		} else {
			let isElementPresent = false;
			for(let i = 0; i < collection.length; i++){
				if(element === collection[i][0]){
					isElementPresent = true;
					return true;
				} 
			} 
			if(!isElementPresent) {
				return false;
			}
		}
	}


}
