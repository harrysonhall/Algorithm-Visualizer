import { PriorityQueue } from "./priority-queue.js";
import { GlobalObj, ClearAlgorithm } from "./global.js";

let log = console.log;

export async function AStarAlgorithm(eventCallerType) {

	

	ClearAlgorithm();

	if (eventCallerType === "mouse") document.querySelector("#current-status").textContent = "Running";

	

	const start_node_img = document.querySelector("#start-node");
	const goal_node_img = document.querySelector("#goal-node");


	let startNodeCords = {
		x: Number(start_node_img.parentElement.dataset.x),
		y: Number(start_node_img.parentElement.dataset.y),
	};
	let goalNodeCords = {
		x: Number(goal_node_img.parentElement.dataset.x),
		y: Number(goal_node_img.parentElement.dataset.y),
	};

	let priorityQueue = new PriorityQueue();
	let closedQueue = [];
	let neighbors = new Array();
	neighbors.push(["north", null], ["east", null], ["south", null], ["west", null] );

	let current = null;

	

	// Find the goal node
	while (current !== goal_node_img.parentElement) {
		
		if (current !== null) {
			current.classList.remove("current");

			// Set the new current
			current = priorityQueue.dequeue();
			current.classList.remove("opened");
			current.classList.add("closed");
			current.classList.add("current");
			closedQueue.push(current);
		}

		// For the first iteration, this declares the 'current' on start
		if (current === null) {
			current = start_node_img.parentElement;
			current.classList.add("closed");
			current.classList.add("current");
			closedQueue.push(current);
			GlobalObj.algorithm_nodes.add(current);
		}



		// Get the neighbors from the current
		let x = Number(current.dataset.x);
		let y = Number(current.dataset.y);

		neighbors[0] = [ "north", document.querySelector("#row" + (y - 1) + "cell" + x) ];
		neighbors[1] = [ "east", document.querySelector("#row" + y + "cell" + (x + 1)), ];
		neighbors[2] = [ "south", document.querySelector("#row" + (y + 1) + "cell" + x) ];
		neighbors[3] = [ "west", document.querySelector("#row" + y + "cell" + (x - 1)) ];




		// Evaluate each neighbor
		for (let i = 0; i < neighbors.length; i++) {

			if ( neighbors[i][1] !== null   &&   !closedQueue.includes(neighbors[i][1])   &&  !neighbors[i][1].classList.contains('wall')) {

				let tempGCost = Number(current.dataset.gcost) + 1;

				if(priorityQueue.contains(neighbors[i][1])) {
					if(tempGCost < Number(neighbors[i][1].dataset.gcost)) {
						neighbors[i][1].dataset.gcost = tempGCost;
					}
				} else {

					let neighborX = Number(neighbors[i][1].dataset.x);
					let neighborY = Number(neighbors[i][1].dataset.y);
											
					let gcost = tempGCost;		neighbors[i][1].dataset.gcost = tempGCost; 
						
					let hcost = Math.sqrt(Math.pow(neighborX - goalNodeCords.x, 2) + Math.pow(neighborY - goalNodeCords.y, 2));
					// let hcost = Math.abs(neighborX - goalNodeCords.x) + Math.abs(neighborY - goalNodeCords.y);
					let fcost = gcost + hcost;

					priorityQueue.enqueue([neighbors[i][1], fcost, hcost, gcost]);
					neighbors[i][1].classList.add("opened");
					neighbors[i][1].dataset.foundfromnode = current.id;
					GlobalObj.algorithm_nodes.add(neighbors[i][1]);

				}
			}
		}

		// Sleep
		if (eventCallerType === "click") await Sleep(getSleepInMilliseconds());
	}


	




	// Now find the path from the Starting Node to the Goal Node.
	let path = [];

	while (current !== start_node_img.parentElement) {
		path.push(current);
		GlobalObj.algorithm_nodes.add(current);

		current.setAttribute("class", "shortest-path");

		current = document.querySelector("#" + current.dataset.foundfromnode);

		if (eventCallerType === "click") await Sleep(getSleepInMilliseconds());
	}






	// For after the algorithm is completed

	document.querySelector("#current-status").textContent = "Completed";

	document.querySelector("#current-nodes-explored").textContent = priorityQueue.getLength() + closedQueue.length;

	document.querySelector("#current-nodes-in-path").textContent = path.length;
}
