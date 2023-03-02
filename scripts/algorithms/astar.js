import { PriorityQueue } from "../function.js";


const tbody 				= document.querySelector("tbody");
const table 				= document.querySelector("table");
const visualize_button		= document.querySelector("#visualize-button");
const start_node_img 		= document.createElement("img");
const goal_node_img			= document.createElement("img");


		start_node_img.id			= "start-node"
		start_node_img.src			= "circle.png";
		start_node_img.draggable	= true;
		start_node_img.classList.add("start-node-img");
		
		goal_node_img.id			= "goal-node"
		goal_node_img.src			= "x.png";
		goal_node_img.draggable		= true;
		goal_node_img.classList.add("goal-node-img");


let current_start_node 		= null;
let current_goal_node 		= null;
let start_node_cords		= { x: 1,	y: 1 };
let goal_node_cords			= { x: 5,	y: 5 };

let isStartNodeBeingDragged = false;
let isGoalNodeBeingDragged	= false;
let isPointerDown = false;


start_node_img.addEventListener("dragstart", 	() => {	start_node_img.classList.add("dragging");		isStartNodeBeingDragged = true; })

start_node_img.addEventListener("dragend", 		() => {	start_node_img.classList.remove("dragging"); 	isStartNodeBeingDragged	= false; isPointerDown = false; })

goal_node_img.addEventListener("dragstart", 	() => {goal_node_img.classList.add("dragging"); 		isGoalNodeBeingDragged	= true; })

goal_node_img.addEventListener("dragend", 		() => {goal_node_img.classList.remove("dragging"); 		isGoalNodeBeingDragged	= false; isPointerDown = false; })

// Handling of creating the Grid

let table_rows;
let amount_of_rows 	= 10;
let amount_of_cells = 10;

const createGrid = () => {

	table_rows = document.querySelectorAll("tr");

	table_rows.forEach(tr => tr.remove());

	
			for(let row_i = 1; row_i <= amount_of_rows; row_i++) {

				let new_row 			= document.createElement("tr");
				new_row.id 				= "row" + row_i;
				new_row.dataset.row 	= row_i;


						for(let cell_i = 1; cell_i <= amount_of_cells; cell_i++) {

							let new_cell 			= document.createElement("td");
								new_cell.id				= "row" + row_i + "cell" + cell_i;

								new_cell.dataset.x		= cell_i;
								new_cell.dataset.y		= row_i;
								new_cell.dataset.state 	= "unopened" // There are 4 states. "unopened", "opened", "closed", and "wall".
								new_cell.dataset.gcost	= (Math.abs(cell_i - start_node_cords.x) 	+ 	Math.abs(row_i - start_node_cords.y));
								new_cell.dataset.hcost	= (Math.abs(cell_i - goal_node_cords.x) 	+ 	Math.abs(row_i - goal_node_cords.y));
								new_cell.dataset.fcost	= (parseInt(new_cell.dataset.gcost) 		+ 	parseInt(new_cell.dataset.hcost));
								new_row.appendChild(new_cell);

								let costs = document.createElement("div")
								let gcost = document.createElement("div")
								let hcost = document.createElement("div")
								let fcost = document.createElement("div")

									gcost.append("G     " + new_cell.dataset.gcost)
									hcost.append("H     " + new_cell.dataset.hcost)
									fcost.append("F     " + new_cell.dataset.fcost)

									costs.append(gcost)
									costs.append(hcost)
									costs.append(fcost)

									costs.classList.add("costs")

									new_cell.append(costs)

							if(new_cell.id === "row1cell1") new_cell.appendChild(start_node_img);
							if(new_cell.id === "row5cell5") new_cell.appendChild(goal_node_img);

							current_start_node 	= start_node_img.parentElement
							current_goal_node	= goal_node_img.parentElement
						}

				tbody.appendChild(new_row);
			}
		
}

createGrid();









// Handling of creating and removing Walls 

let createOrRemoveWalls = null;

		table.addEventListener("pointerdown", (e) => { 
			isPointerDown = true; 
				if(e.target.dataset.state === 'unopened') 	createOrRemoveWalls = "create";
				else if (e.target.dataset.state === 'wall') createOrRemoveWalls = "remove";
			createAndRemoveWalls(e);
			
		})

		table.addEventListener("pointerup", (e) => { 
			isPointerDown = false; 
		})

		table.addEventListener("pointerover", (e) => {
			createAndRemoveWalls(e); 
		})

		const createAndRemoveWalls = (e) => {

			if(isPointerDown && e.target.tagName === "TD"  && isStartNodeBeingDragged === false && isGoalNodeBeingDragged === false){
				
				// Create a Wall
				if(e.target.classList.contains("wall") === false && createOrRemoveWalls === "create") 	{ e.target.classList.add('wall'); e.target.dataset.state = "wall"; }

				// Remove a Wall
				if(e.target.classList.contains("wall") === true && createOrRemoveWalls === "remove")	{ e.target.classList.remove('wall'); e.target.dataset.state = "unopened"; }

			}
		}









// Handling of updating the Cell's Formula Data when Start and/or Goal Nodes are moved

const cells = document.querySelectorAll("td")


cells.forEach((cell) => {

	cell.addEventListener("dragover", (e) => {

		e.preventDefault();
	
		if(isStartNodeBeingDragged == true && cell.contains(goal_node_img) == false && e.target.dataset.state !== "wall") cell.appendChild(start_node_img)

			else if (isGoalNodeBeingDragged == true && cell.contains(start_node_img) == false && e.target.dataset.state !== "wall") cell.appendChild(goal_node_img)
	
		onNodeChange(e);
		
	})
})



		const onNodeChange = (e) => {

			if(e.target.tagName === "TD" && e.target.id !== current_start_node.id  && e.target !== current_goal_node) {

				updateCoordinateData(e);
				
				updateCellData(e)

				updateStartAndGoalNodes(e);

			}
		} 


				const updateCoordinateData = (e) => {

						start_node_cords.x	= parseInt(start_node_img.parentElement.dataset.x);
						start_node_cords.y	= parseInt(start_node_img.parentElement.dataset.y);

						goal_node_cords.x	= parseInt(goal_node_img.parentElement.dataset.x);
						goal_node_cords.y	= parseInt(goal_node_img.parentElement.dataset.y);
				}


				const updateCellData = (e) => {

						cells.forEach((cell) => {

							let x = parseInt(cell.dataset.x);
							let y = parseInt(cell.dataset.y);

							cell.dataset.gcost = (Math.abs(x - start_node_cords.x) 	+ 	Math.abs(y - start_node_cords.y));
							cell.dataset.hcost = (Math.abs(x - goal_node_cords.x) 	+ 	Math.abs(y - goal_node_cords.y));
							cell.dataset.fcost = parseInt(cell.dataset.gcost) 		+ parseInt(cell.dataset.hcost);
						})
				}


				const updateStartAndGoalNodes = (e) => {

						current_start_node = start_node_img.parentElement; 
						current_goal_node = goal_node_img.parentElement;
							
				}




visualize_button.addEventListener("click", (e) => {
	iterate();
})







// Handling of A* Iteration


let current 	= null;
let isPathFound = false;

let lowestFCost;
let nodeWithLowestFCost;

let neighbors = new Map();
	neighbors.set('north', null);
	neighbors.set('east', null);
	neighbors.set('south', null);
	neighbors.set('west', null);


let openQueue = new PriorityQueue()

let closedQueue = [];

console.log(openQueue.contains(goal_node_img.parentElement))

function sleep() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('sleep');
			console.log('slept')
		}, 500)
	})
}



const iterate = async function() {

	while (isPathFound === false) {

		// Given that the current 'Close' the new current
		if(current !== null) {

			current.classList.remove("current")

			// Set the new current
			current = openQueue.dequeue();

			current.dataset.state = "closed";

			current.classList.remove("opened");

			current.classList.add("closed");

			current.classList.add("current")

			closedQueue.push(current)

			if(current === goal_node_img.parentElement) isPathFound = true;
		}

		// Declare the current on start
		if(current === null) {

			current = start_node_img.parentElement;

			current.dataset.state = "closed";

			current.classList.add("closed");

			current.classList.add("current")

			closedQueue.push(current)

		}

		// Get the neighbors from the current

		let x = parseInt(current.dataset.x);	let y = parseInt(current.dataset.y);
		
		neighbors.set('north', document.querySelector("#row" + (y - 1) + "cell" + x))
		neighbors.set('east', document.querySelector("#row" + y + "cell" + (x + 1)))
		neighbors.set('south', document.querySelector("#row" + (y + 1) + "cell" + x))
		neighbors.set('west', document.querySelector("#row" + y + "cell" + (x - 1)));


		// 'Open' any neighbors not in the opened Queue and add them to it

		for(let neighbor of neighbors) {
			
			// Things to check: (in no specific order)
				// 1. The neighbor 'value', is not null
				// 2. The neighbor 'value', is not in the Open Queue already
				// 3. The neighbor does not contain any classes (making it an 'unopened' node)

			// If all of these parameters are passed, then add the neighbor to the Open Queue

			if(neighbor[1] !== null && openQueue.contains(neighbor[1]) === false && neighbor[1].dataset.state === "unopened") {

				let fcost = parseInt(neighbor[1].dataset.fcost);
				let hcost = parseInt(neighbor[1].dataset.hcost);
				openQueue.enqueueByHcost([ neighbor[1], fcost, hcost]);
				neighbor[1].dataset.state = "opened";
				neighbor[1].classList.add("opened");

			}
		}
	
		openQueue.printCollection()

		await sleep();

	} // else console.log('Path has been found!')
}