
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

			if(isPointerDown && e.target.tagName === "TD" && e.target.hasChildNodes() === false && isStartNodeBeingDragged === false && isGoalNodeBeingDragged === false){
				
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

let openList 	= [];
let closedList 	= [];
let current 	= null;
let isPathFound = false;

let lowestFCost;
let nodeWithLowestFCost;

let neighbors = new Map();
	neighbors.set('north', null);
	neighbors.set('east', null);
	neighbors.set('south', null);
	neighbors.set('west', null);


const iterate = () => {

	if (isPathFound === false) {

			setStartingCurrent();

			updateCurrent();

			getNeighbors();

			openNeighbors();

			examineOpenedNeighbors();

			console.log(openList)
	

	} else console.log('Path has been found!')
}

		const setStartingCurrent = () => {

			// Setting the start node for 'current'
			if(current === null) { 

				// Set the initial lowest f-cost
				lowestFCost = parseInt(start_node_img.parentElement.dataset.fcost)

				// Set the intial lowest f-cost node
				nodeWithLowestFCost = start_node_img.parentElement;

				// Set the current to the node with the start node img
				current = nodeWithLowestFCost; 

				// Add it to the open list
				openList.push(current);

				// Set the dataset state to be "opened"
				current.dataset.state = "opened"
			}
		}

		const updateCurrent = () => {

				// If the previous/old current contains the class 'current' then remove it.
				if(current.classList.contains("current")) { current.classList.remove("current")}

			// Set the current to the node with the lowest F cost
			current = nodeWithLowestFCost;

			// Remove it from the open list
			openList.pop(current)

			// Add it to the closed list
			closedList.push(current)
			
			// Add the closed class to it
			current.classList.add("closed")

			// Add the current class to it
			current.classList.add("current")

				// And also remove the opened class if it contains it
				if(current.classList.contains("opened")) { current.classList.remove("opened")}

			// Set the dataset state to be "closed"
			current.dataset.state = "closed"

				// If the current is the target, then set isPathFound to true to stop iterations
				if(current === goal_node_img.parentElement) { isPathFound = true; }

		}

		const getNeighbors = () => {

			let x = parseInt(current.dataset.x);	let y = parseInt(current.dataset.y);

			north 	= "#row" + (y - 1) + "cell" + x;
			east 	= "#row" + y + "cell" + (x + 1);
			south	= "#row" + (y + 1) + "cell" + x;
			west 	= "#row" + y + "cell" + (x - 1);

			neighbors.set('north', document.querySelector(north))
			neighbors.set('east', document.querySelector(east))
			neighbors.set('south', document.querySelector(south))
			neighbors.set('west', document.querySelector(west));
		}

		const openNeighbors = () => {

			neighbors.forEach((neighbor) => {
				if (neighbor !== null && neighbor.dataset.state === "unopened") {

					// "Opening" a neighbor.

					// Add it to the open list
					openList.push(neighbor)
				
					// Add the opened class to it
					neighbor.classList.add("opened")

					// Set the dataset state to be "opened"
					neighbor.dataset.state = "opened"
				}
			})
		}

		const examineOpenedNeighbors = () => {

			for(let neighbor of openList) {

				// // Set the first neighbor in the list to have the lowest f cost, just to have something to start with
				// if(neighbor === openList[0]) { lowestFCost = neighbor.dataset.fcost;	nodeWithLowestFCost = neighbor }

				// Check if the iterating neighbor's f-cost is lower than or equal to the current lowest f-cost.
				if(parseInt(neighbor.dataset.fcost) <= lowestFCost) {

					// If so, set the lowest f-cost number to that of the currently iterating neighbor's f-cost
					lowestFCost = parseInt(neighbor.dataset.fcost);

					// And set the node of the lowest f-cost variable to this currently iterated neighbor
					nodeWithLowestFCost = neighbor;
				}
			}
		}