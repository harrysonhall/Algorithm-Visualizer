import { AStarAlgorithm } from "./astar-algorithm.js";
import { BreadthFirstSearchAlgorithm } from "./breadth-first-search-algorithm.js";
import { SetupDragNDrop } from "./drap-n-drop.js";
const log = console.log


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
const grid_height_input				= document.querySelector("#grid_height_input");
const grid_height_output			= document.querySelector("#grid_height_output");
const grid_width_input				= document.querySelector("#grid_width_input");
const grid_width_output				= document.querySelector("#grid_width_output");
const speed_input 					= document.querySelector('#speed_input');
const speed_output 					= document.querySelector('#speed_output');

const clear_walls_button			= document.querySelector('#clear-walls');
const reset_board_button			= document.querySelector('#reset-board');
const iterate_button				= document.querySelector("#visualize-button");

const selected_algorithm_output 	= document.querySelector('#selected_algorithm_output');
const selected_grid_height_output 	= document.querySelector('#selected_grid_height_output');
const selected_grid_width_output	= document.querySelector('#selected_grid_width_output');
const selected_speed_output 		= document.querySelector('#selected_speed_output');

const table_wrapper 				= document.querySelector('#table-wrapper');
const tbody 						= document.querySelector("tbody");


let amount_of_rows 			= (table_wrapper.clientHeight - (table_wrapper.clientHeight % 20) - 80) / 20;
let amount_of_cells 		= (table_wrapper.clientWidth - (table_wrapper.clientWidth % 20) - 80) / 20;
let selected_algorithm 		= "None";


		// Setting Default Grid Sizes based on Clients Screen Width & Height
		grid_height_output.textContent 	= amount_of_rows;
		grid_width_output.textContent 	= amount_of_cells

		grid_height_input.max 			= amount_of_rows;
		grid_height_input.value			= amount_of_rows;

		grid_width_input.max			= amount_of_cells;
		grid_width_input.value			= amount_of_cells;
		
		
		function setListeners() {

			algorithms.addEventListener('click', algorithm => {
				UpdateAlgorithm(algorithm);
			})

			grid_height_input.addEventListener("input", height => {
				UpdateGridHeight(height);
			})

			grid_width_input.addEventListener("input", width => {
				UpdateGridWidth(width);
			})

			speed_input.addEventListener("input", speed => {
				UpdateSpeed(speed);
			})

			clear_walls_button.addEventListener('click', () => {
				ClearWalls()
			})

			reset_board_button.addEventListener('click', () => {
				ResetBoard()
			})

			iterate_button.addEventListener('click', () => {
				StartAlgorithm()
			})

			// Drag And Drop Functionality is handled in a seperate file

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
							new_cell.dataset.foundfromnode = null;
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

			

				function StartAlgorithm() {

					switch(selected_algorithm_output.textContent) {
			
						case "A* Search":					AStarAlgorithm();					break;

						case "Breadth-First Search":		BreadthFirstSearchAlgorithm();		break;
					}
				}

				function ClearWalls() {
		
					document.querySelectorAll('td').forEach((cell) => {
		
						if(cell.classList.contains('wall'))	cell.classList.remove('wall');
					})
				}
				





export function Initialize(){

	createGrid();

	setListeners();

	SetupDragNDrop();

}

export function getSleepInMilliseconds() {

	let current_speed = parseInt(speed_input.value);
	let speed_in_milliseconds;

	switch(current_speed) {
		case 1:		speed_in_milliseconds = 930;	break;
		case 2:		speed_in_milliseconds = 830;	break;
		case 3:		speed_in_milliseconds = 730;	break;
		case 4:		speed_in_milliseconds = 630;	break;
		case 5:		speed_in_milliseconds = 530;	break;
		case 6:		speed_in_milliseconds = 430;	break;
		case 7:		speed_in_milliseconds = 330;	break;
		case 8:		speed_in_milliseconds = 230;	break;
		case 9:		speed_in_milliseconds = 130;	break;
		case 10:	speed_in_milliseconds = 30;		break;
	}
	
	return speed_in_milliseconds;

}

export function ResetBoard(){

	document.querySelector('#current-status').textContent = "";

	document.querySelector('#current-nodes-explored').textContent = 0;

	document.querySelector('#current-nodes-in-path').textContent = 0;

	document.querySelectorAll('td').forEach((cell) => {

		cell.setAttribute('class', '')
		
	})
}
