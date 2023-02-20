
const tbody 				= document.querySelector("tbody");
const table 				= document.querySelector("table");
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

start_node_img.addEventListener("dragstart", 	() => {	start_node_img.classList.add("dragging");		isStartNodeBeingDragged = true; })

start_node_img.addEventListener("dragend", 		() => {	start_node_img.classList.remove("dragging"); 	isStartNodeBeingDragged	= false; })

goal_node_img.addEventListener("dragstart", 	() => {goal_node_img.classList.add("dragging"); 		isGoalNodeBeingDragged	= true; })

goal_node_img.addEventListener("dragend", 		() => {goal_node_img.classList.remove("dragging"); 		isGoalNodeBeingDragged	= false; })


let table_rows;
let amount_of_rows 	= 5;
let amount_of_cells = 5;

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
								new_cell.dataset.gcost	= (Math.abs(cell_i - start_node_cords.x) 	+ 	Math.abs(row_i - start_node_cords.y));
								new_cell.dataset.hcost	= (Math.abs(cell_i - goal_node_cords.x) 	+ 	Math.abs(row_i - goal_node_cords.y));
								new_cell.dataset.fcost	= (parseInt(new_cell.dataset.gcost) 		+ 	parseInt(new_cell.dataset.hcost));
								new_row.appendChild(new_cell);

							if(new_cell.id === "row1cell1") new_cell.appendChild(start_node_img);
							if(new_cell.id === "row5cell5") new_cell.appendChild(goal_node_img);

							current_start_node 	= start_node_img.parentElement
							current_goal_node	= goal_node_img.parentElement
						}

				tbody.appendChild(new_row);
			}
		
}

createGrid();




const cells = document.querySelectorAll("td")

cells.forEach((cell) => {

	cell.addEventListener("dragover", (e) => {

		e.preventDefault();
	
		if(isStartNodeBeingDragged == true && cell.contains(goal_node_img) == false) cell.appendChild(start_node_img)

			else if (isGoalNodeBeingDragged == true && cell.contains(start_node_img) == false) cell.appendChild(goal_node_img)
	
		onNodeChange(e);
		
	})
})



		const onNodeChange = (e) => {

			if(e.target.tagName === "TD" && e.target.id !== current_start_node.id  && e.target !== current_goal_node) {

				updateCoordinateData(e);
				
				updateCellData(e)

				updateStartGoalNodes(e);

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

							x = parseInt(cell.dataset.x)
							y = parseInt(cell.dataset.y)

							console.log("test")

							cell.dataset.gcost = (Math.abs(x - start_node_cords.x) 	+ 	Math.abs(y - start_node_cords.y));
							cell.dataset.hcost = (Math.abs(x - goal_node_cords.x) 	+ 	Math.abs(y - goal_node_cords.y));
							cell.dataset.fcost = parseInt(cell.dataset.gcost) + parseInt(cell.dataset.hcost);
						})
				}



				const updateStartGoalNodes = (e) => {

						current_start_node = start_node_img.parentElement; 
						current_goal_node = goal_node_img.parentElement;
							// console.log(current_start_node.id, current_goal_node.id)
				}