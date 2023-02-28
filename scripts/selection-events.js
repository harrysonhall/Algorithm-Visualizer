export function selectedAlgorithm() {

	let selectedAlgorithm = "None";
	let selectedAlgorithmOutput = document.querySelector('#selected_algorithm_output');

	document.querySelector('#algorithms').addEventListener('click', (e) => {

		selectedAlgorithm !== e.target ? selectedAlgorithm = e.target : selectedAlgorithm = "None";

			switch(selectedAlgorithm) {
				case document.querySelector('#astar_algorithm'):
					selectedAlgorithmOutput.textContent = "A* Search";
						break;

				case document.querySelector('#breadth_algorithm'):
					selectedAlgorithmOutput.textContent = "Breadth-First Search";
						break;

				case "None":
					selectedAlgorithmOutput.textContent = "None";
						break;
			}
	})
	
}


export function selectedHeight(height) {

	let selected_grid_height = document.querySelector('#selected_grid_height_output');

	selected_grid_height.textContent = height.target.value;
}


export function selectedWidth(width) {

	let selected_width_height = document.querySelector('#selected_grid_width_output');

	selected_width_height.textContent = width.target.value;
}

 
export function selectedSpeed() {

	let speed_value = document.querySelector('#speed_value');
	let speed_output = document.querySelector('#speed_output');
	let selected_speed_output = document.querySelector('#selected_speed_output')

	speed_value.addEventListener("input", (speed) => {

		speed_output.textContent = speed.target.value
		
		selected_speed_output.textContent = speed.target.value
	})

}