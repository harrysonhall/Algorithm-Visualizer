export class GlobalObject {

	static algorithms					= document.querySelector('#algorithms')
	static grid_height_input			= document.querySelector("#grid_height_input");
	static grid_height_output			= document.querySelector("#grid_height_output");
	static grid_width_input				= document.querySelector("#grid_width_input");
	static grid_width_output			= document.querySelector("#grid_width_output");
	static speed_input 					= document.querySelector('#speed_input');
	static speed_output 				= document.querySelector('#speed_output');

	static clear_walls_button			= document.querySelector('#clear-walls');
	static clear_algorithm_button		= document.querySelector('#clear-algorithm')
	static reset_board_button			= document.querySelector('#reset-board');
	static iterate_button				= document.querySelector("#visualize-button");

	static selected_algorithm_output 	= document.querySelector('#selected_algorithm_output');
	static selected_grid_height_output 	= document.querySelector('#selected_grid_height_output');
	static selected_grid_width_output	= document.querySelector('#selected_grid_width_output');
	static selected_speed_output 		= document.querySelector('#selected_speed_output');

	static table_wrapper 				= document.querySelector('#table-wrapper');
	static tbody 						= document.querySelector("tbody");
	static table 						= document.querySelector('table');
}