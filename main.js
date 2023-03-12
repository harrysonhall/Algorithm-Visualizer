import { setDragNDrop } from "./other/drap-n-drop.js";
import { createGrid } from "./other/initializer.js";

import { GlobalObj } from "./other/global.js";

const log = console.log


createGrid();
setDragNDrop();

// const tick = () => {

// 	GlobalObj.closedQueue.addClosedClassToNodes()
	

// 	requestAnimationFrame(tick)
// }

// tick();

