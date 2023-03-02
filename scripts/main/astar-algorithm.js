
import { PriorityQueue } from "../function.js";
import { Sleep } from "./sleep.js";


let log = console.log


export async function AStarAlgorithm() {
	

	const start_node_img 	= document.querySelector('#start-node');
	const goal_node_img		= document.querySelector('#goal-node');

	let startNodeCords = { 
		x: parseInt(start_node_img.parentElement.dataset.x),
		y: parseInt(start_node_img.parentElement.dataset.y)
	}

	let goalNodeCords = {
		x: parseInt(goal_node_img.parentElement.dataset.x),
		y: parseInt(goal_node_img.parentElement.dataset.y)
	}

	let isPathFound = false;

	let priorityQueue = new PriorityQueue();
	let closedQueue = [];

	let current = null;
	let neighbors = new Map();
		neighbors.set('north', null);
		neighbors.set('east', null);
		neighbors.set('south', null);
		neighbors.set('west', null);
	
	console.log(start_node_img.parentElement)


		
		while(!isPathFound) {
			
			if(current !== null) {

				current.classList.remove("current")

				// Set the new current
				current = priorityQueue.dequeue();

				current.classList.remove("opened");

				current.classList.add("closed");

				current.classList.add("current")

				closedQueue.push(current)

				if(current === goal_node_img.parentElement) isPathFound = true;
			}




			// For the first iteration, this declares the 'current' on start
			if(current === null) {

				current = start_node_img.parentElement;

				current.classList.add("closed");

				current.classList.add("current")

				closedQueue.push(current)

			}
	



			// Get the neighbors from the current
			let x = parseInt(current.dataset.x);	let y = parseInt(current.dataset.y);

				neighbors.set('north', document.querySelector("#row" + (y - 1) + "cell" + x));
				neighbors.set('east', document.querySelector("#row" + y + "cell" + (x + 1)));
				neighbors.set('south', document.querySelector("#row" + (y + 1) + "cell" + x));
				neighbors.set('west', document.querySelector("#row" + y + "cell" + (x - 1)));




			// Evaluate the neighbors, if they are 'unopened' then calculate their G-Cost, 
			// H-Cost, and F-Cost and add them to the Priority Queue
			for(let neighbor of neighbors) {
		
				// Things to check: (in no specific order)
					// 1. The neighbor 'value', is not null
					// 2. The neighbor 'value', is not in the Open Queue already
					// 3. The neighbor does not contain any classes (making it an 'unopened' node)
	
					// If all of these parameters are passed, then add the neighbor to the Open Queue
					if(neighbor[1] !== null && priorityQueue.contains(neighbor[1]) === false && neighbor[1].classList.length === 0) {

						let neighborX = parseInt(neighbor[1].dataset.x);
						let neighborY = parseInt(neighbor[1].dataset.y);
		
						let gcost = (Math.abs(neighborX - startNodeCords.x) + 	Math.abs(neighborY - startNodeCords.y));
						let hcost =	(Math.abs(neighborX - goalNodeCords.x) 	+ 	Math.abs(neighborY - goalNodeCords.y));
						let fcost = gcost + hcost;
						
						priorityQueue.enqueueByHcost([ neighbor[1], fcost, hcost, gcost]);
						neighbor[1].classList.add("opened");
		
					}
			}


			priorityQueue.printCollection();
			await Sleep();
		}

}