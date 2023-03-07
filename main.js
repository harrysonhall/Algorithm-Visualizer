import { Initialize } from "./scripts/main/initializer.js";


Initialize();

const myMap = new Array();
myMap.push(	['north', 'Hi I am north'], 
			['east', 'Hi I am east'], 
			['south', 'Hi I am south'], 
			['west', 'Hi I am west']);
			

let normalOrder = [0,1,2,3];
let reverseOrder = [2,1,0,3];

for(let i = 0; i < myMap.length; i++) {
	let j = reverseOrder[i];
	console.log(myMap[j][1]);
}
			
// myMap.push(['east', 'Hi I am east']);
// myMap.push(['south', 'Hi I am south']);
// myMap.push(['west', 'Hi I am west']);

// console.log(myMap);