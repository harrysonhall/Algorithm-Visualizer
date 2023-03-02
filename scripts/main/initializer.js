import { AStarAlgorithm } from "./astar-algorithm.js";


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






const algorithms					= document.querySelector('#algorithms')
const grid_height_value				= document.querySelector("#grid_height_value");
const grid_height_output			= document.querySelector("#grid_height_output");
const grid_width_value				= document.querySelector("#grid_width_value");
const grid_width_output				= document.querySelector("#grid_width_output");
const speed_value 					= document.querySelector('#speed_value');
const speed_output 					= document.querySelector('#speed_output');

const clear_walls_button			= document.querySelector('#clear-walls');
const iterate_button				= document.querySelector("#visualize-button");

const selected_algorithm_output 	= document.querySelector('#selected_algorithm_output');
const selected_grid_height_output 	= document.querySelector('#selected_grid_height_output');
const selected_grid_width_output	= document.querySelector('#selected_grid_width_output');
const selected_speed_output 		= document.querySelector('#selected_speed_output');

const tbody 						= document.querySelector("tbody");
const table 						= document.querySelector('table');

const log							= console.log

let amount_of_rows 		= 5;
let amount_of_cells 	= 5;
let selected_algorithm 	= "None";
let isPointerDown		= false;
let isItCreateOrRemove	= "neither";
let pointerDownTarget 	= null;

		
		function setListeners() {

			algorithms.addEventListener('click', algorithm => {
				UpdateAlgorithm(algorithm);
			})

			grid_height_value.addEventListener("input", height => {
				UpdateGridHeight(height);
			})

			grid_width_value.addEventListener("input", width => {
				UpdateGridWidth(width);
			})

			speed_value.addEventListener("input", speed => {
				UpdateSpeed(speed);
			})

			table.addEventListener('pointerdown', down => {
				UpdatePointerDown(down);
			})

			table.addEventListener('pointerover', over => {
				UpdatePointerOver(over);
			})

			document.addEventListener('pointerup', (up) => {
				UpdatePointerUp(up);
			})

			clear_walls_button.addEventListener('click', () => {
				ClearWalls()
			})

			iterate_button.addEventListener('click', () => {
				StartAlgorithm()
			})

		}

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




				function UpdateGridHeight(height) {

					amount_of_rows = height.target.value;
					grid_height_output.textContent = height.target.value;
					selected_grid_height_output.textContent = height.target.value;

					createGrid();
				}
				
				function UpdateGridWidth(width) {

					amount_of_cells	= width.target.value;
					grid_width_output.textContent = width.target.value;
					selected_grid_width_output.textContent = width.target.value;

					createGrid();
				}

				function UpdateSpeed(speed) {

					speed_output.textContent = speed.target.value
					selected_speed_output.textContent = speed.target.value
				}

				function UpdateAlgorithm(algorithm) {
				
					selected_algorithm !== algorithm.target ? selected_algorithm = algorithm.target : selected_algorithm = "None";
		
					switch(selected_algorithm) {
						case document.querySelector('#astar_algorithm'):
							selected_algorithm_output.textContent = "A* Search";
								break;
		
						case document.querySelector('#breadth_algorithm'):
							selected_algorithm_output.textContent = "Breadth-First Search";
								break;
		
						case "None":
							selected_algorithm_output.textContent = "None";
								break;
					}
				}

				function UpdatePointerDown(down) {

					isPointerDown 		= true;

					down.target.releasePointerCapture(down.pointerId);
						
					if(down.target.tagName === "IMG") 	pointerDownTarget = down.target;	isItCreateOrRemove = "neither";
					
					if(down.target.tagName === "TD") 	checkCreateOrRemoveWall(down);		createOrRemoveWall(down);
				}

				function UpdatePointerOver(over) {

					if(over.target.tagName === "TD")	moveStartOrGoalNode(over);			createOrRemoveWall(over);	
				}

				function UpdatePointerUp(up) {

					isPointerDown = false;
				
					if(start_node_img.classList.contains("dragging"))	start_node_img.classList.remove("dragging")
				
					if(goal_node_img.classList.contains("dragging")) 	goal_node_img.classList.remove("dragging");
				}

				function ClearWalls() {
		
					document.querySelectorAll('td').forEach((cell) => {
		
						if(cell.classList.contains('wall'))	cell.classList.remove('wall');
					})
				}

				function StartAlgorithm() {

					switch(selected_algorithm_output.textContent) {
			
						case "A* Search":		AStarAlgorithm();		break;
					}
				}


				



				

						function moveStartOrGoalNode(over) {
				
							if(isPointerDown  &&  !over.target.hasChildNodes()  &&  !over.target.classList.contains('wall')  &&  isItCreateOrRemove === "neither") { 
								
								if(pointerDownTarget === start_node_img)		{ over.target.appendChild(start_node_img);	start_node_img.classList.add("dragging"); }
		
								else if(pointerDownTarget === goal_node_img) 	{ over.target.appendChild(goal_node_img);	goal_node_img.classList.add("dragging"); }			
							}	
						}
						
				
						function checkCreateOrRemoveWall(down) {
				
							if(isPointerDown  &&  down.target.tagName === "TD"  &&  !down.target.hasChildNodes()) { 
				
								switch(down.target.classList.contains('wall')) {
				
									case true:		isItCreateOrRemove = "remove";		break;
				
									case false:		isItCreateOrRemove = "create";		break;
								}
							}
						}
				
			
						function createOrRemoveWall(cell) {
							
							if(isPointerDown  &&  cell.target.tagName === "TD"  &&  !cell.target.hasChildNodes()) {
				
								console.log("move id", cell.pointerId);
				
								switch(isItCreateOrRemove) {
									
									case "remove":		if(cell.target.classList.contains('wall')) cell.target.classList.remove('wall');		break;
											
									case "create":		if(!cell.target.classList.contains('wall'))	cell.target.classList.add('wall');			break;
								}
							}
						}




export function Initialize(){

	createGrid();

	setListeners();

}