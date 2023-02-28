import { initializeGrid, dragAndDrop } from "./scripts/grid-events.js";
import { selectedAlgorithm, selectedSpeed } from "./scripts/selection-events.js";
import { clearWalls } from "./scripts/operation-events.js";



initializeGrid();

dragAndDrop();

selectedAlgorithm();

selectedSpeed();

clearWalls();