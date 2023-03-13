export function PriorityQueue() {
	let collection = [];

	this.printCollection = function () {
		console.log(collection);
	};

	this.enqueue = function (element) {
		element[0].cellType = "OpenSet";
		element[0].isCellTypeSet = false;

		if (this.isEmpty()) {
			collection.push(element);
		} else {
			let added = false;
			for (let i = 0; i < collection.length; i++) {
				if (element[1] < collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
			}
			if (!added) {
				collection.push(element);
			}
		}
	};

	this.enqueueByHcost = function (element) {
		element[0].cellType = "OpenSet";
		element[0].isCellTypeSet = false;
		if (this.isEmpty()) {
			collection.push(element);
		} else {
			let added = false;
			for (let i = 0; i < collection.length; i++) {
				if (element[1] <= collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
				if (element[1] === collection[i][1]) {
					// in the case that the fcosts are the same

					if (element[2] < collection[i][2]) {
						//check if one has a greater h-cost
						collection.splice(i, 0, element);
						added = true;
						break;
					}
				}
				// console.log(element[2], collection[i][2])
			}
			if (!added) {
				collection.push(element);
			}
		}
	};

	this.enqueueByAdjacencyTieBreaker = function (
		element,
		tieBreaker,
		neighborName
	) {
		if (this.isEmpty()) {
			collection.push(element);
		} else {
			let added = false;
			for (let i = 0; i < collection.length; i++) {
				if (element[1] < collection[i][1]) {
					collection.splice(i, 0, element);
					added = true;
					break;
				}
				if (element[1] === collection[i][1]) {
					// in the case that the fcosts are the same

					if (element[2] < collection[i][2]) {
						//check if one has a greater h-cost
						collection.splice(i, 0, element);
						added = true;
						break;
					}

					if (element[2] === collection[i][2]) {
						// in the case that the fcosts AND hcosts are the same

						if (
							(tieBreaker === 0 && neighborName === "south") ||
							neighborName === "north"
						) {
							// if the horizontal costs are currently more expensive
							console.log(neighborName);
							collection.splice(i, 0, element);
							added = true;
							break;
						}

						if (
							(tieBreaker === 1 && neighborName === "east") ||
							neighborName === "west"
						) {
							// if the vertical costs are currently more expensive
							console.log(neighborName);
							collection.splice(i, 0, element);
							added = true;
							break;
						}
					}
				}
				// console.log(element[2], collection[i][2])
			}
			if (!added) {
				collection.push(element);
			}
		}
	};

	this.dequeue = function () {
		let value = collection.shift();
		return value[0];
	};

	this.front = function () {
		return collection[0];
	};

	this.size = function () {
		return collection.length;
	};

	this.isEmpty = function () {
		return collection.length === 0;
	};

	this.getLength = function () {
		return collection.length;
	};

	this.contains = function (element) {
		if (this.isEmpty()) {
			return false;
		} else {
			let isElementPresent = false;
			for (let i = 0; i < collection.length; i++) {
				if (element === collection[i][0]) {
					isElementPresent = true;
					return true;
				}
			}
			if (!isElementPresent) {
				return false;
			}
		}
	};

	this.getPriorityQueue = function() {
		return collection;
	}

	this.resetCellType = function () {
		
		for(let nodeIndex = 0; nodeIndex < collection.length; nodeIndex++) {
		
			collection[nodeIndex][0].cellType = "Open";
			collection[nodeIndex][0].isCellTypeSet = false;
		}
		
	}
}
