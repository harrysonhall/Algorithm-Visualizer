export function clearWalls() {

	document.querySelector('#clear-walls').addEventListener('click', (e) => {

		console.log(e)
		document.querySelectorAll('td').forEach((cell) => {

			if(cell.classList.contains('wall'))	cell.classList.remove('wall');

		})
	})

}