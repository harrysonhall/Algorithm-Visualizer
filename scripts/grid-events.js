import { selectedHeight, selectedWidth } from "./selection-events.js";

// Global Variables
const tbody = document.querySelector("tbody");
const table = document.querySelector('table')
const start_node_img 	= document.createElement("img");
const goal_node_img		= document.createElement("img");

	start_node_img.id = "start-node"
	start_node_img.src = "circle.png";
	start_node_img.draggable = false;
	start_node_img.classList.add("start-node-img");
	
	goal_node_img.id = "goal-node"
	goal_node_img.src = "x.png";
	goal_node_img.draggable = false;
	goal_node_img.classList.add("goal-node-img");




export function initializeGrid() {

	let grid_height_value			= document.querySelector("#grid_height_value");
	let grid_height_output			= document.querySelector("#grid_height_output");
	let grid_width_value			= document.querySelector("#grid_width_value");
	let grid_width_output			= document.querySelector("#grid_width_output");
	let amount_of_rows 	= 5;
	let amount_of_cells = 5;



	grid_height_value.addEventListener("input", (height) => {

		amount_of_rows					= height.target.value;
		grid_height_output.textContent 	= height.target.value;
		createGrid();
		selectedHeight(height);
	})

	grid_width_value.addEventListener("input", (width) => {

		amount_of_cells					= width.target.value;
		grid_width_output.textContent	= width.target.value;
		createGrid();
		selectedWidth(width);
	})


		function createGrid() {

			document.querySelectorAll("tr").forEach(tr => tr.remove());

			for(let row_i = 1; row_i <= amount_of_rows; row_i++) {

				let new_row 	= document.createElement("tr");
					new_row.id 		= "row" + row_i;

					for(let cell_i = 1; cell_i <= amount_of_cells; cell_i++) {

						let new_cell 		= document.createElement("td");
							new_cell.id			= "row" + row_i + "cell" + cell_i;
							new_cell.dataset.x	= cell_i;
							new_cell.dataset.y	= row_i;
							new_row.appendChild(new_cell);

							if(new_cell.id === "row1cell1") new_cell.appendChild(start_node_img);
							if(new_cell.id === "row5cell5") new_cell.appendChild(goal_node_img);

					}
				tbody.appendChild(new_row);
			}
		}


	createGrid();
}









export function dragAndDrop() {

	let isPointerDown = false;
	let isItCreateOrRemove = "neither";
	let pointerDownTarget = null;


	table.addEventListener('pointerdown', (down) => {

		isPointerDown 		= true;

		down.target.releasePointerCapture(down.pointerId);
		
		if(down.target.tagName === "IMG") 	pointerDownTarget = down.target;	isItCreateOrRemove = "neither";

		if(down.target.tagName === "TD")	checkCreateOrRemoveWall(down);	createOrRemoveWall(down);

	})
	

	
	table.addEventListener('pointerover', (over) => {

		if(over.target.tagName === "TD")		moveStartOrGoalNode(over);		createOrRemoveWall(over);		

	})


	document.addEventListener('pointerup', (up) => {

		isPointerDown = false;

		if(start_node_img.classList.contains("dragging"))	start_node_img.classList.remove("dragging")

		if(goal_node_img.classList.contains("dragging")) 	goal_node_img.classList.remove("dragging");

	})




		function moveStartOrGoalNode(over) {

			// To actually MOVE a Start or Goal node, we 
			// must first check for the following:
			//
			// 1. That the Pointer is in a 'Down' state
			// 2. That the Target we are trying to move to, does not contain any children (aka, we dont want to put the start and goal node in the same cell)
			// 3. That the Target we are trying to move to, is not a 'wall'
			// 4. That we are not in a state of 'creating' or 'removing' walls

			if(isPointerDown  &&  !over.target.hasChildNodes()  &&  !over.target.classList.contains('wall')  &&  isItCreateOrRemove === "neither") { 
				
						if(pointerDownTarget === start_node_img)		{ over.target.appendChild(start_node_img);	start_node_img.classList.add("dragging"); }

						else if(pointerDownTarget === goal_node_img) 	{ over.target.appendChild(goal_node_img);	goal_node_img.classList.add("dragging"); }			
				}	
			}
		
		
		
		
		function checkCreateOrRemoveWall(down) {

			// To check to SEE if we can build a Wall or Remove a wall, 
			// 	we must first check for the following:
			//
			// 		1. That the Pointer is in a 'Down' state
			// 		2. That the intial pointer.down target, is a 'Table Data' / 'Table Cell'
			// 		3. That the intial pointer.down target has no child nodes (aka, that the pointer.down cell, does not contain the Start or Goal Nodes)

			if(isPointerDown  &&  down.target.tagName === "TD"  &&  !down.target.hasChildNodes()) { 

				switch(down.target.classList.contains('wall')) {

					case true:	isItCreateOrRemove = "remove";
							break;

					case false:	isItCreateOrRemove = "create";
							break;
				}
			}
		}



		function createOrRemoveWall(cell) {

			// To actually CREATE or REMOVE a Wall, 
			// we first check for the following:
			//
			// 		1. That the Pointer is in a 'Down' state
			//		2. That the intial pointer.down target, is a 'Table Data' / 'Table Cell'
			//		3. That the intial pointer.down target has no child nodes (aka, that the pointer.down cell, does not contain the Start or Goal Nodes)
			
			if(isPointerDown  &&  cell.target.tagName === "TD"  &&  !cell.target.hasChildNodes()) {

				console.log("move id", cell.pointerId);

				switch(isItCreateOrRemove) {
					
					case "remove":	cell.target.classList.contains('wall') ? cell.target.classList.remove('wall')	: null;
							break;

					case "create":	!cell.target.classList.contains('wall') ? cell.target.classList.add('wall')		: null;
							break;
				}
			}
		}

	
}