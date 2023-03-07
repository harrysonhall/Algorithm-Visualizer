import { PriorityQueue } from "./priority-queue.js";
import { Sleep } from "./sleep.js";
import { getSleepInMilliseconds, ClearAlgorithm } from "./initializer.js";


let log 			= console.log



export async function AStarAlgorithm(eventCallerType) {

	


	ClearAlgorithm();

	if(eventCallerType === "mouse") document.querySelector('#current-status').textContent = "Running";

	console.log(eventCallerType)
	
	const start_node_img 	= document.querySelector('#start-node');
	const goal_node_img		= document.querySelector('#goal-node');

	let startNodeCords = { 	x: parseInt(start_node_img.parentElement.dataset.x),	y: parseInt(start_node_img.parentElement.dataset.y)	}
	let goalNodeCords = {	x: parseInt(goal_node_img.parentElement.dataset.x),		y: parseInt(goal_node_img.parentElement.dataset.y)	}

	let priorityQueue = new PriorityQueue();
	let closedQueue = [];
	let neighbors = new Array();
		neighbors.push(	['north', null], 
						['east', null], 
						['south', null], 
						['west', null]);

	let isPathFound = false;
	let current = null;
	let diagonalPatternToggler = true;
	let normalOrder = [0,1,2,3];
	let reverseOrder = [2,1,0,3];


	
	console.log(start_node_img.parentElement)

	// Find the goal node
	while(current !== goal_node_img.parentElement) {

		diagonalPatternToggler ? diagonalPatternToggler = false : diagonalPatternToggler = true;
		log(diagonalPatternToggler)
		

		if(current !== null) {

			current.classList.remove("current")

			// Set the new current
			current = priorityQueue.dequeue();
			current.classList.remove("opened");
			current.classList.add("closed");
			current.classList.add("current");
			closedQueue.push(current);

			if(current === goal_node_img.parentElement) isPathFound = true;
		}




		// For the first iteration, this declares the 'current' on start
		if(current === null) {

			current = start_node_img.parentElement;
			current.classList.add("closed");
			current.classList.add("current");
			closedQueue.push(current);

		}




		// Get the neighbors from the current
		let x = parseInt(current.dataset.x);	let y = parseInt(current.dataset.y);

		neighbors[0] = ['north', document.querySelector("#row" + (y - 1) + "cell" + x)]
		neighbors[1] = ['east', document.querySelector("#row" + y + "cell" + (x + 1))];
		neighbors[2] = ['south', document.querySelector("#row" + (y + 1) + "cell" + x)];
		neighbors[3] = ['west', document.querySelector("#row" + y + "cell" + (x - 1))];




		
		// This is to create the diagnoal patterns with 4-way movement.
		switch(diagonalPatternToggler) {

			case true: 
							for(let i = 0; i < neighbors.length; i++) {

								let j = reverseOrder[i];
								EvaluateNeighbors(j);
							}
				break;

			case false:
							for(let i = 0; i < neighbors.length; i++) {

								let j = normalOrder[i];
								EvaluateNeighbors(j);
							}
				break;
		}
			
		
		
		// Sleep
		if(eventCallerType === "click") await Sleep(getSleepInMilliseconds());
	}



			// Now find the path from the Starting Node to the Goal Node.
			let path = [];

			while(current !== start_node_img.parentElement) {

				path.push(current);

				current.setAttribute('class','shortest-path');
				
				current = document.querySelector('#' + current.dataset.foundfromnode);

				if(eventCallerType === "click") await Sleep(getSleepInMilliseconds());
			}



			// For after the algorithm is completed

			document.querySelector('#current-status').textContent = "Completed"

			document.querySelector('#current-nodes-explored').textContent = priorityQueue.getLength() + closedQueue.length

			document.querySelector('#current-nodes-in-path').textContent = path.length





	
	function EvaluateNeighbors(j) {

		if(neighbors[j][1] !== null && priorityQueue.contains(neighbors[j][1]) === false && neighbors[j][1].classList.length === 0) {

			let neighborX = parseInt(neighbors[j][1].dataset.x);
			let neighborY = parseInt(neighbors[j][1].dataset.y);

			let gcost = (Math.abs(neighborX - startNodeCords.x) + 	Math.abs(neighborY - startNodeCords.y));
			let hcost =	(Math.abs(neighborX - goalNodeCords.x) 	+ 	Math.abs(neighborY - goalNodeCords.y));
			let fcost = gcost + hcost;

			priorityQueue.enqueueByHcost([neighbors[j][1], fcost, hcost, gcost]);
			neighbors[j][1].classList.add("opened");
			neighbors[j][1].dataset.foundfromnode = current.id
		}
	}
}






		