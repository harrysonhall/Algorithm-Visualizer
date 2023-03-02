import { AStarAlgorithm } from "./astar-algorithm.js";

let log = console.log
let iterateButton = document.querySelector("#visualize-button")
let selectedAlgorithm;

export function iterate() {
	
	iterateButton.addEventListener('click', (e) => {

		selectedAlgorithm = document.querySelector('#selected_algorithm_output').textContent

		log(selectedAlgorithm)

		switch(selectedAlgorithm) {

			case "A* Search":
				AStarAlgorithm();
					break;
		}

	})
}