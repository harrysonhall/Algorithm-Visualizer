import { GlobalObj, SelectCurrentAlgorithm } from "./global.js";

const log = console.log;

export function setDragNDrop(){

	const table = document.querySelector('table');
	const start_node = document.querySelector('#start-node');
	const goal_node = document.querySelector('#goal-node');
	let isPointerDown = false;
	let downTarget;
	let createOrRemoveWalls;
	let StartGoalNodeOrCells;


	document.addEventListener('pointerdown', down => {

		down.target.releasePointerCapture(down.pointerId);

		downTarget = down.target
		isPointerDown = true;

		// We need to check what we are working with first. The Start or Goal Node? or Empty Cells?

		// This is for if the down.target is a Start Node or Goal Node
		if(down.target === start_node || down.target === goal_node)	{
			StartGoalNodeOrCells = "StartGoalNode";
		}

		// This is for if the down.target is an Empty Table Cell
		else if(down.target.tagName === "TD" && !down.target.hasChildNodes()) {

			let x = Number(down.target.dataset.x);
			let y = Number(down.target.dataset.y);

			// Check if the cell is wall or not
			switch(down.target.classList.value) {
				case "": 	
						createOrRemoveWalls = "create";
						down.target.classList.add('wall');
						GlobalObj.node_grid[y][x].state = "blocked";
				break;


				case "wall":
						createOrRemoveWalls = "remove";
						down.target.classList.remove('wall');
						GlobalObj.node_grid[y][x].state = "unblocked";
				break;
			}
		}
	})

	

	table.addEventListener('pointerover', over => {

		

		if(isPointerDown) {
			GlobalObj.startTime = Date.now();
		
			///////////////////////////////////////////////////
			// WHEN DOING SOMETHING WITH START OR GOAL NODES //
			///////////////////////////////////////////////////
			if(downTarget === start_node || downTarget === goal_node) {

				switch(document.querySelector('#current-status').textContent) {

					// This is for if the "Visualize" Button is 
					// clicked and we are not instantly computing the algorithm.
					case "Idle": 
							if(over.target.tagName === "TD" && !over.target.hasChildNodes() && over.target.classList.value === "") {
								// This visually moves the start or goal node
								over.target.appendChild(downTarget);
								// This updates the start_node for the algorithms
								let x = Number(over.target.dataset.x);
								let y = Number(over.target.dataset.y);
								downTarget === start_node ? GlobalObj.start_node = GlobalObj.node_grid[y][x] : GlobalObj.target_node = GlobalObj.node_grid[y][x];
							}
					break;


					// This is for if the algorithm alreeady ran and we are 
					// in real time 'updating' the algorithm as the start or goal node is moved around.
					case "Completed": 
							if(over.target.tagName === "TD" && !over.target.hasChildNodes() && !over.target.classList.contains('wall')) {
								// This visually moves the start or goal node
								over.target.appendChild(downTarget);
								// This updates the start_node for the algorithms
								let x = Number(over.target.dataset.x);
								let y = Number(over.target.dataset.y);
								downTarget === start_node ? GlobalObj.start_node = GlobalObj.node_grid[y][x] : GlobalObj.target_node = GlobalObj.node_grid[y][x]
								// This is a call to run the algorithm again
								SelectCurrentAlgorithm(over);
							}
					break;
				}

				
			}

			////////////////////////////////////////////////
			// WHEN DOING SOMETHING WITH JUST TABLE CELLS //
			////////////////////////////////////////////////
			else if(downTarget.tagName === "TD" && !downTarget.hasChildNodes() && over.target.tagName === "TD" && !over.target.hasChildNodes()){

				let x = Number(over.target.dataset.x);
				let y = Number(over.target.dataset.y);

				switch(createOrRemoveWalls) {
					case "create":  
							if(over.target.classList.value === "")	{
								over.target.classList.add('wall');
								GlobalObj.node_grid[y][x].state = "blocked";
							}
					break;

					
					case "remove": 
							if(over.target.classList.value === "wall")	{
								over.target.classList.remove('wall');
								GlobalObj.node_grid[y][x].state = "unblocked";
							}
					break;
				}
			}
		}
	})

	document.addEventListener('pointerup', up => {
		isPointerDown = false;
	})

}