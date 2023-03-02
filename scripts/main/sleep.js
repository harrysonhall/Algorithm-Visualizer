export function Sleep() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve('sleep');
			console.log('slept')
		}, 150)
	})
}