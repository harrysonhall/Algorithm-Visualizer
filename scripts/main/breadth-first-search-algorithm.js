
import { Sleep } from "./sleep.js";
import { getSleepInMilliseconds , ClearAlgorithm} from "./initializer.js";


let log = console.log


export async function BreadthFirstSearchAlgorithm(eventCallerType) {

	ClearAlgorithm();

	if(eventCallerType === 'click') document.querySelector('#current-status').textContent = "Running";

	const start_node_img 	= document.querySelector('#start-node');
	const goal_node_img		= document.querySelector('#goal-node');

	let isPathFound = false;

	let openQueue = [];
	let closedQueue = [];

	let current = null;
	let neighbors = new Map();
		neighbors.set('north', null);
		neighbors.set('east', null);
		neighbors.set('south', null);
		neighbors.set('west', null);




		while(!isPathFound) {


			if(current !== null) {

				current.classList.remove("current")

				// Set the new current
				current = openQueue.shift();

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

				current.classList.add("current");

				closedQueue.push(current);
			}




			// Get the neighbors from the current
			let x = parseInt(current.dataset.x);	let y = parseInt(current.dataset.y);

				neighbors.set('north', document.querySelector("#row" + (y - 1) + "cell" + x));
				neighbors.set('east', document.querySelector("#row" + y + "cell" + (x + 1)));
				neighbors.set('south', document.querySelector("#row" + (y + 1) + "cell" + x));
				neighbors.set('west', document.querySelector("#row" + y + "cell" + (x - 1)));




			// Add selected neighbors to the Open Queue
			for(let neighbor of neighbors) {
	
				// Things to check: (in no specific order)
					// 1. The neighbor 'value', is not null
					// 2. The neighbor 'value', is not in the Open Queue already
					// 3. The neighbor does not contain any classes (making it an 'unopened' node)
	
				// If all of these parameters are passed, then add the neighbor to the Open Queue
				if(neighbor[1] !== null && openQueue.includes(neighbor[1]) === false && neighbor[1].classList.length === 0) {

					openQueue.push(neighbor[1])
					neighbor[1].classList.add("opened");
					neighbor[1].dataset.foundfromnode = current.id
				}
			}



			// Sleep
			if(eventCallerType === 'click') await Sleep(getSleepInMilliseconds());
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

		document.querySelector('#current-status').textContent = "Completed";

		document.querySelector('#current-nodes-explored').textContent = openQueue.length + closedQueue.length;

		document.querySelector('#current-nodes-in-path').textContent = path.length;
}