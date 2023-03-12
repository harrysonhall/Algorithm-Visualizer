import { GlobalObj, ClearWalls, ClearAlgorithm, ResetBoard, SelectCurrentAlgorithm } from "./global.js";
import { AStarAlgorithm } from "./astar-algorithm.js";
import { setDragNDrop } from "./drap-n-drop.js";
const log = console.log


const amount_of_columns 	= (GlobalObj.table_wrapper.clientHeight - (GlobalObj.table_wrapper.clientHeight % 20) - 80) / 20;
const amount_of_rows 		= (GlobalObj.table_wrapper.clientWidth - (GlobalObj.table_wrapper.clientWidth % 20) - 80) / 20;
let selected_algorithm 		= "None";


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



		
		

		GlobalObj.algorithms.addEventListener('click', algorithm => {
			UpdateAlgorithm(algorithm);
		})

		GlobalObj.speed_input.addEventListener("input", speed => {
			UpdateSpeed(speed);
		})

		GlobalObj.clear_walls_button.addEventListener('click', () => {
			ClearWalls();
		})

		GlobalObj.clear_algorithm_button.addEventListener('click', () => {
			ClearAlgorithm();
		})

		GlobalObj.reset_board_button.addEventListener('click', () => {
			ResetBoard();
		})

		GlobalObj.iterate_button.addEventListener('click', (e) => {
			SelectCurrentAlgorithm(e);
		})



		


	import Node from "./algorithms.js";

	export function createGrid() {
		
		document.querySelectorAll("tr").forEach(tr => tr.remove());

		for(let row_i = 0; row_i < amount_of_columns; row_i++) {

			let new_row 	= document.createElement("tr");
				new_row.id 		= "row" + row_i;
			

				for(let cell_i = 0; cell_i < amount_of_rows; cell_i++) {
					let new_cell 		= document.createElement("td");
						new_cell.id			= "row" + row_i + "cell" + cell_i;
						new_cell.dataset.x	= cell_i;
						new_cell.dataset.y	= row_i;
						new_row.appendChild(new_cell);

						if(new_cell.id === "row1cell1") new_cell.appendChild(start_node);
						if(new_cell.id === "row5cell5") new_cell.appendChild(goal_node);	
				}
			tbody.appendChild(new_row);
			// break;
		}

	

		// CREATE THE NODE GRID
		GlobalObj.node_grid = new Array(amount_of_columns);

		for(let cell = 0; cell < amount_of_columns; cell++) {

			GlobalObj.node_grid[cell] = new Array(amount_of_rows)
		}


		// POPULATE EACH INDEX IN THE NODE GRID WITH A 'NODE' INSTANCE
		for(let y = 0; y < amount_of_columns; y++) {

			for(let x = 0; x < amount_of_rows; x++) {

				GlobalObj.node_grid[y][x] = new Node(document.querySelector('#row' + y + 'cell' + x), x, y)
			}
		}


		// PRECOMPUTE THE NEIGHBORS 
		for(let y = 0; y < amount_of_columns; y++) {

			for(let x = 0; x < amount_of_rows; x++) {

				GlobalObj.node_grid[y][x].getNeighbors();
			

			}
		}


		// SET THE START NODE AND TARGET NODE & THEIR CELLTYPE
		GlobalObj.start_node = GlobalObj.node_grid[1][1];
		GlobalObj.target_node = GlobalObj.node_grid[5][5];

		GlobalObj.node_grid[1][1].cellType = "StartOrTargetNode";
		GlobalObj.node_grid[5][5].cellType = "StartOrTargetNode";




		// FOR TESTING
		tick();

	}



			// For Testing Purposes - Testing how long it takes to iterate through the node grid and check a property
			function test() {

				const startTime = Date.now()
				let counter = 0;

					for(let y = 0; y < amount_of_columns; y++) {
						for(let x = 0; x < amount_of_rows; x++) {

							if(!GlobalObj.node_grid[y][x].isCellTypeSet) {
								// console.log(GlobalObj.node_grid[y][x].cellType);
								switch(GlobalObj.node_grid[y][x].cellType) {
									
									case "Open": 				
										GlobalObj.node_grid[y][x].node.setAttribute('class', '');				
										GlobalObj.node_grid[y][x].isCellTypeSet = true;		
										break;

									case "OpenSet":				
										GlobalObj.node_grid[y][x].node.setAttribute('class', 'opened');			
										GlobalObj.node_grid[y][x].isCellTypeSet = true;	
										break;

									case "ClosedSet": 			
										GlobalObj.node_grid[y][x].node.setAttribute('class', 'closed');			
										GlobalObj.node_grid[y][x].isCellTypeSet = true;	
										break;

									case "Wall": 				
										GlobalObj.node_grid[y][x].node.setAttribute('class', 'wall');			
										GlobalObj.node_grid[y][x].isCellTypeSet = true;		
										break;

									case "StartOrTargetNode": 	
										GlobalObj.node_grid[y][x].node.setAttribute('class', '');				
										GlobalObj.node_grid[y][x].isCellTypeSet = true;			
										break;

									case "Path": 				
										GlobalObj.node_grid[y][x].node.setAttribute('class', 'shortest-path');	
										GlobalObj.node_grid[y][x].isCellTypeSet = true;	
										break;
								}
							}

						}
					}
					const endTime = Date.now()
					// console.log((endTime - startTime) + "ms")
			}
			

			const tick = () => {

				test();


				requestAnimationFrame(tick)
			}

	


	




	function UpdateSpeed(speed) {

		GlobalObj.speed_output.textContent = speed.target.value
		GlobalObj.selected_speed_output.textContent = speed.target.value
	}

	function UpdateAlgorithm(algorithm) {
	
		(selected_algorithm !== algorithm.target) ? selected_algorithm = algorithm.target : selected_algorithm = "None";

		switch(selected_algorithm) {


			case document.querySelector('#greedy_algorithm'):
				GlobalObj.selected_algorithm_output.textContent = "Greedy Best-First Search";
					break;


			case document.querySelector('#breadth_algorithm'):
				GlobalObj.selected_algorithm_output.textContent = "Breadth-First Search";
					break;


			case document.querySelector('#astar_algorithm'):
				GlobalObj.selected_algorithm_output.textContent = "A* Algorithm";
					break;


			case "None":
				GlobalObj.selected_algorithm_output.textContent = "None";
					break;
		}
	}
