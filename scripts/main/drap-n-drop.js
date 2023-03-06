const log = console.log;

export function SetupDragNDrop(){

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

		// If the down.target is the Start Node or Goal Node, then we are working with those nodes
		if(down.target === start_node || down.target === goal_node)	{
			StartGoalNodeOrCells = "StartGoalNode";
		}

		// If the down.target is an Empty Table Cell, then we are working with those nodes
		else if(down.target.tagName === "TD" && !down.target.hasChildNodes()) {

			// Check if the cell is wall or not
			switch(down.target.classList.value) {
				case "": 	
					createOrRemoveWalls = "create";
					down.target.classList.add('wall');
						break;
				case "wall":
					createOrRemoveWalls = "remove";
					down.target.classList.remove('wall');
						break;
			}
		}
	})

	table.addEventListener('pointerover', over => {

		if(isPointerDown) {
		
			// If the down.target is the Start Node or Goal Node, then we are working with those nodes
			if(downTarget === start_node || downTarget === goal_node) {

				// Check to see if the over.target is an Empty Cell that isnt a wall or some other node
				if(over.target.tagName === "TD" && !over.target.hasChildNodes() && over.target.classList.value === "") {
					over.target.appendChild(downTarget);
				}
			}
			
			// If the down.target is an Empty Table Cell, then we are working with those nodes
			else if(downTarget.tagName === "TD" && !downTarget.hasChildNodes() && over.target.tagName === "TD" && !over.target.hasChildNodes()){

				switch(createOrRemoveWalls) {
					case "create":  
						if(over.target.classList.value === "")	over.target.classList.add('wall');
							break;

					case "remove": 
						if(over.target.classList.value === "wall")	over.target.classList.remove('wall');
							break;
				}
			}
		}
	})

	document.addEventListener('pointerup', up => {
		isPointerDown = false;
	})

}
