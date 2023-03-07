import { GlobalObject } from "./global-object.js";
import { GreedyBestFirstAlgorithm } from "./greedy-best-first.js";
import { BreadthFirstSearchAlgorithm } from "./breadth-first-search-algorithm.js";
import { AStarAlgorithm } from "./astar-algorithm.js";
import { setDragNDrop } from "./drap-n-drop.js";
const log = console.log


const start_node 	= document.createElement("img");
const goal_node		= document.createElement("img");

	start_node.id = "start-node"
	start_node.src = "imgs/start-node.png";
	start_node.draggable = false;
	start_node.classList.add("start-node-img");
	
	goal_node.id = "goal-node"
	goal_node.src = "imgs/goal-node.png";
	goal_node.draggable = false;
	goal_node.classList.add("goal-node-img");


let amount_of_rows 			= (GlobalObject.table_wrapper.clientHeight - (GlobalObject.table_wrapper.clientHeight % 20) - 80) / 20;
let amount_of_cells 		= (GlobalObject.table_wrapper.clientWidth - (GlobalObject.table_wrapper.clientWidth % 20) - 80) / 20;
let selected_algorithm 		= "None";


		// Setting Default Grid Sizes based on Clients Screen Width & Height
		GlobalObject.grid_height_output.textContent 	= amount_of_rows;
		GlobalObject.grid_width_output.textContent 	= amount_of_cells

		GlobalObject.grid_height_input.max 			= amount_of_rows;
		GlobalObject.grid_height_input.value			= amount_of_rows;

		GlobalObject.grid_width_input.max			= amount_of_cells;
		GlobalObject.grid_width_input.value			= amount_of_cells;
		
		
		function setListeners() {

			GlobalObject.algorithms.addEventListener('click', algorithm => {
				UpdateAlgorithm(algorithm);
			})

			GlobalObject.grid_height_input.addEventListener("input", height => {
				UpdateGridHeight(height);
			})

			GlobalObject.grid_width_input.addEventListener("input", width => {
				UpdateGridWidth(width);
			})

			GlobalObject.speed_input.addEventListener("input", speed => {
				UpdateSpeed(speed);
			})

			GlobalObject.clear_walls_button.addEventListener('click', () => {
				ClearWalls();
			})

			GlobalObject.clear_algorithm_button.addEventListener('click', () => {
				ClearAlgorithm();
			})

			GlobalObject.reset_board_button.addEventListener('click', () => {
				ResetBoard();
			})

			GlobalObject.iterate_button.addEventListener('click', (e) => {
				log(e.type)
				StartAlgorithm(e);
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

							if(new_cell.id === "row1cell1") new_cell.appendChild(start_node);
							if(new_cell.id === "row5cell5") new_cell.appendChild(goal_node);

					}
				tbody.appendChild(new_row);
			}
		}




				function UpdateGridHeight(height) {

					amount_of_rows = height.target.value;
					GlobalObject.grid_height_output.textContent = height.target.value;
					GlobalObject.selected_grid_height_output.textContent = height.target.value;

					createGrid();
				}
				
				function UpdateGridWidth(width) {

					amount_of_cells	= width.target.value;
					GlobalObject.grid_width_output.textContent = width.target.value;
					GlobalObject.selected_grid_width_output.textContent = width.target.value;

					createGrid();
				}

				function UpdateSpeed(speed) {

					GlobalObject.speed_output.textContent = speed.target.value
					GlobalObject.selected_speed_output.textContent = speed.target.value
				}

				function UpdateAlgorithm(algorithm) {
				
					selected_algorithm !== algorithm.target ? selected_algorithm = algorithm.target : selected_algorithm = "None";
		
					switch(selected_algorithm) {
						case document.querySelector('#greedy_algorithm'):
							GlobalObject.selected_algorithm_output.textContent = "Greedy Best-First Search";
								break;
		
						case document.querySelector('#breadth_algorithm'):
							GlobalObject.selected_algorithm_output.textContent = "Breadth-First Search";
								break;

						case document.querySelector('#astar_algorithm'):
							GlobalObject.selected_algorithm_output.textContent = "A* Algorithm";
								break;
		
						case "None":
							GlobalObject.selected_algorithm_output.textContent = "None";
								break;
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

	setDragNDrop();

}

export function StartAlgorithm(e) {

	switch(GlobalObject.selected_algorithm_output.textContent) {

		case "Greedy Best-First Search":	GreedyBestFirstAlgorithm(e.type);			break;

		case "Breadth-First Search":		BreadthFirstSearchAlgorithm(e.type);		break;

		case "A* Algorithm":				AStarAlgorithm(e.type);						break;
	}
}

export function getSleepInMilliseconds() {

	let speed_in_milliseconds;

	switch(parseInt(speed_input.value)) {
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

	document.querySelector('#current-status').textContent = "Idle";

	document.querySelector('#current-nodes-explored').textContent = 0;

	document.querySelector('#current-nodes-in-path').textContent = 0;

	document.querySelectorAll('td').forEach((cell) => {

		cell.setAttribute('class', '')
		
	})
}

export function ClearAlgorithm() {

	document.querySelector('#current-status').textContent = "Idle";

	document.querySelector('#current-nodes-explored').textContent = 0;

	document.querySelector('#current-nodes-in-path').textContent = 0;

	document.querySelectorAll('td').forEach((cell) => {
		
		if(!cell.classList.contains('wall')) cell.setAttribute('class', '')
	})
}