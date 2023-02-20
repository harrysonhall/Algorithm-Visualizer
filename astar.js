
const tbody = document.querySelector("tbody");
const table = document.querySelector("table");
let cells;


let start_node_cords	= { x: 1,	y: 1 };
let goal_node_cords		= { x: 5,	y: 5 };

let current_element = null;

table.addEventListener("mouseover", (element) => {

	if(element.target.id !== "table" && element.target.id !== "tbody") {

		if(current_element == null) {

			element.target.classList.add("selected");

			current_element = element.target;

		} else if(current_element !== null) { //This will check if the current element variable is not equal to null, then if its not, it will perform one of two options.

			current_element.classList.remove("selected");

			if(element.target.id == current_element.id) {

				current_element = null;

			} else {

				element.target.classList.add("selected");

				current_element = element.target

				

			}

		}

	} 

	// reupate();

	test_function();
	// if(current_element !== null) console.log(current_element.dataset.gcost);

	// if(current_element !== null )	{ 
	// 	console.log(
	// 		" G-Cost: " + current_element.dataset.gcost + 
	// 		" H-Cost: " + current_element.dataset.hcost +
	// 		" F-Cost: " + current_element.element.fcost
	// 		) }
})




let table_rows;
let amount_of_rows 	= 5;
let amount_of_cells = 5;

		const grid_updater = () => {

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
							new_cell.dataset.gcost	= (Math.abs(cell_i - start_node_cords.x) 	+ 	Math.abs(row_i - start_node_cords.y));
							new_cell.dataset.hcost	= (Math.abs(cell_i - goal_node_cords.x) 	+ 	Math.abs(row_i - goal_node_cords.y));
							new_cell.dataset.fcost	= (parseInt(new_cell.dataset.gcost) 		+ 	parseInt(new_cell.dataset.hcost));

							new_row.appendChild(new_cell);

	
						}

					tbody.appendChild(new_row);
				}

				cells = document.querySelectorAll("td");
				
		}


grid_updater();


// setTimeout(() => { console.log(cells)}, 5000)
console.log(cells)


const reupate = () => {
	if(current_element !== null) {
		start_node_cords.x = parseInt(current_element.dataset.x)
		start_node_cords.y = parseInt(current_element.dataset.y)

		// console.log(start_node_cords.x + " " + start_node_cords.y)
	}
}

const algo_update = () => {
	if(current_element !== null) {
		for(let node of cells) {
			node.dataset.gcost = (Math.abs(parseInt(node.dataset.x) + start_node_cords.x) + Math.abs(parseInt(node.dataset.y) + start_node_cords.y));
			node.dataset.hcost = (Math.abs(parseInt(node.dataset.x) + goal_node_cords.x) + Math.abs(parseInt(node.dataset.y) + goal_node_cords.y));
			node.dataset.fcost = parseInt(node.dataset.gcost) + parseInt(node.dataset.hcost);
		}
	}
}

const test_function = () => {
	if(current_element !== null) {
		for(let node of cells) {
			let x = (parseInt(current_element.dataset.x))
			let y = (parseInt(current_element.dataset.y))
			let g_x	= Math.abs(x - start_node_cords.x) 
			let g_y =  Math.abs(y - start_node_cords.y) 
			let g_cost = g_x + g_y
			console.log(g_cost)
		}
	}
}