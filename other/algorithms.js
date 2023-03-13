import  { GlobalObj, Sleep, ClearAlgorithm, getSleepInMilliseconds } from "./global.js";


const log = console.log

export default class Node {

	constructor(node, x, y){
		this.node = node;
		this.x = x;
		this.y = y;
		this.gcost = 0;
		this.hcost = 0;
		this.fcost = 0;
		this.neighbors = [];
		this.previousNode = undefined;
		this.state = "unblocked";		// There will be two states. 'unblocked' and 'blocked'
		this.cellType = "Open";			// There are 5 different 'Cell Type's: "Open", "OpenSet", "ClosedSet", "Wall", "StartOrTargetNode", and "Path"		(Optionally their could be 6, the 6th being "Current")
		this.isCellTypeSet = false;
	}

	getNeighbors() {

		// This works by checking if these certain index positions exist within the 'node_grid'
		// property (which is the Matrix/ Mutli-Dimensional Array Grid) of the imported GlobalObj Class. 
		// And If such an index position does exist, then it would mean there is a neighbor that exists and 
		// it will push it into the 'neighbors' array, in the constructor of THIS Node Class.

		
		// North Neighbor
		if (GlobalObj.node_grid[this.y-1]?.[this.x] !== undefined) {

			this.neighbors.push(GlobalObj.node_grid[this.y-1][this.x])
		}
	
		// // East Neighbor
		if(GlobalObj.node_grid[this.y]?.[this.x+1] !== undefined) {

			this.neighbors.push(GlobalObj.node_grid[this.y][this.x+1])
		}

		// South Neighbor
		if(GlobalObj.node_grid[this.y+1]?.[this.x] !== undefined) {

			this.neighbors.push(GlobalObj.node_grid[this.y+1][this.x])
		}

		// West Neighbor
		if(GlobalObj.node_grid[this.y]?.[this.x-1] !== undefined) {

			this.neighbors.push(GlobalObj.node_grid[this.y][this.x-1])
		}
	}

	set_gcost(gcost){

		// Update the G-Cost
		this.gcost = gcost;

		// Also Update the F-Cost to reflect the new G-Cost
		this.fcost = this.gcost + this.hcost;
	}

	set_hcost(hcost) {

		// Update th H-Cost
		this.hcost = hcost;
	}

}

const testNode = new Node(1,1,1)





















export async function AStar(eventCallerType) {

	const stfull = Date.now()

	ClearAlgorithm();
	const etClearAlgo = Date.now();

	if (eventCallerType === "mouse") document.querySelector("#current-status").textContent = "Running";

	
	let openQueue = GlobalObj.priorityQueue;
	let closedQueue = GlobalObj.closedQueue;
	let finalPath = GlobalObj.finalPath;
	let current = GlobalObj.start_node;

	openQueue.enqueue([GlobalObj.start_node]);


	const stWhileLoop = Date.now()
	while(current !== GlobalObj.target_node) {

		// Set the new current and remove it from the open queue
		current = openQueue.dequeue();
		
		// Push the new current into the closed queue
		closedQueue.enqueue(current);
		
	
		// iterate through the current's neighbors
		for(const neighbor of current.neighbors) {

			if(!closedQueue.contains(neighbor) && neighbor.state !== "blocked") {

				let tentativeGCost = current.gcost + 1;
			
				if(openQueue.contains(neighbor)) {

					if(tentativeGCost < neighbor.gcost) 	neighbor.set_gcost(tentativeGCost)
				
				} else {

					neighbor.set_hcost(Math.sqrt(Math.pow(neighbor.x - GlobalObj.target_node.x, 2) + Math.pow(neighbor.y - GlobalObj.target_node.y, 2)));
					// neighbor.set_hcost(Math.abs(neighbor.x - GlobalObj.target_node.x) + Math.abs(neighbor.y - GlobalObj.target_node.y))
					neighbor.set_gcost(tentativeGCost);
					neighbor.previousNode = current;
					openQueue.enqueue([neighbor, neighbor.fcost]);
					// openQueue.enqueueByHcost([neighbor, neighbor.fcost, neighbor.hcost]);
				}
			}
		}
		if (eventCallerType === "click") await Sleep(getSleepInMilliseconds());
	}

	const etWhileLoop = Date.now()



	const stWhileEndLoop = Date.now()
	// Reconstruct path once algorithm is finished
	while (current !== GlobalObj.start_node) {

		finalPath.enqueue(current);	

		current = current.previousNode;

		if (eventCallerType === "click") await Sleep(getSleepInMilliseconds());
	}

	document.querySelector("#current-status").textContent = "Completed";

	document.querySelector("#current-nodes-explored").textContent = openQueue.getLength() + closedQueue.getLength();

	document.querySelector("#current-nodes-in-path").textContent = finalPath.getLength();

	const etfull = Date.now()

	GlobalObj.endTime = Date.now();

	// This is the true time it takes for the entire function to execute instantly from the moment the pointover starts to the end of the algorithm
	// console.log((GlobalObj.endTime - GlobalObj.startTime) + "ms");

	
	// console.log("Clear Algorithm: " + (etClearAlgo - stfull) + "ms");
	// console.log("Algorithm: " + (etWhileLoop - stWhileLoop) + "ms");
	// console.log("Overrall: " + (etfull - stfull) + "ms");
	// console.log("End: " + (etfull - stWhileEndLoop) + "ms")
}