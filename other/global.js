import { AStar } from "./algorithms.js";
import { PriorityQueue } from "./priority-queue.js";
import ClosedQueue from "./closed-queue.js"
import FinalPath from "./final-path.js";

const co = new ClosedQueue();


export class GlobalObj {

	// Global Variables - DOM Nodes 
	static algorithms					= document.querySelector('#algorithms')
	static speed_input 					= document.querySelector('#speed_input');
	static speed_output 				= document.querySelector('#speed_output');

	static clear_walls_button			= document.querySelector('#clear-walls');
	static clear_algorithm_button		= document.querySelector('#clear-algorithm')
	static reset_board_button			= document.querySelector('#reset-board');
	static iterate_button				= document.querySelector("#visualize-button");

	static selected_algorithm_output 	= document.querySelector('#selected_algorithm_output');
	static selected_speed_output 		= document.querySelector('#selected_speed_output');

	static table_wrapper 				= document.querySelector('#table-wrapper');
	static tbody 						= document.querySelector("tbody");
	static table 						= document.querySelector('table');


	static node_grid;
	static start_node;
	static target_node;

	static priorityQueue = new PriorityQueue();
	static closedQueue = new ClosedQueue();
	static finalPath = new FinalPath();



	// Temporary Variables for Testing Purposes
	static startTime;
	static endTime;
}

const pr = new PriorityQueue()







export function Sleep(milliseconds) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('sleep');
		}, milliseconds)
	})
}


export function ClearWalls() {

	document.querySelectorAll('td').forEach((cell) => {

		if(cell.classList.contains('wall'))	cell.classList.remove('wall');
	})
	
}


export function ClearAlgorithm() {

	if(document.querySelector('#current-status').textContent !== "Idle") {

		document.querySelector('#current-status').textContent = "Idle";

		document.querySelector('#current-nodes-explored').textContent = 0;

		document.querySelector('#current-nodes-in-path').textContent = 0;
	}

	GlobalObj.priorityQueue.resetCellType();

	GlobalObj.closedQueue.resetCellType();

	GlobalObj.finalPath.resetCellType();

	GlobalObj.priorityQueue = new PriorityQueue();

	GlobalObj.closedQueue = new ClosedQueue();

	GlobalObj.finalPath = new FinalPath();
	
}


export function ResetBoard(){

	document.querySelector('#current-status').textContent = "Idle";

	document.querySelector('#current-nodes-explored').textContent = 0;

	document.querySelector('#current-nodes-in-path').textContent = 0;

	document.querySelectorAll('td').forEach((cell) => {

		cell.setAttribute('class', '')
		
	})
}


export function SelectCurrentAlgorithm(e) {

	switch(GlobalObj.selected_algorithm_output.textContent) {

		case "A* Algorithm":				AStar(e.type);						break;
	}
}


export function getSleepInMilliseconds() {

	let speed_in_milliseconds;

	switch(Number(GlobalObj.speed_input.value)) {
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
