/*
The game.js file sets up the canvas context and contains the main loop that will drive the whole program. 
*/

// Imports
import { getGlobal } from "../globals.js";
import { drawSprite } from "./drawSprite.js";
import { generateMap } from './generateMap.js';
import { keyPress } from './keyPress.js';
import { drawTreasure } from "./treasure.js";
import { collectTreasure } from "./collect.js";
import { userInterface } from "./userInterface.js";
import { drawOpponents } from "../opponents/drawOpponents.js";
import { checkCollision } from "../opponents/checkCollision.js";
import { betweenRounds } from "./betweenRounds.js";
// Global page variables 
let ctx;
let canvas;

// Import maps 
import backgroundmap from '../map/background.js';
import details from '../map/details.js';
import wallsfloor from '../map/wallsfloor.js';

export default function startGame() {
  // Get canvas and context
  ctx = getGlobal('ctx');
  canvas = getGlobal('canvas');

  // Start the game loop
  gameLoop();
}

// Define frames per second (FPS)
let fps = 60; // Change this value to whatever frame rate you want your game to run at
let interval = 1000 / fps; // Calculate the interval in milliseconds
let lastTime = Date.now();


function gameLoop() {

  let now = Date.now();
  let elapsed = now - lastTime;

  // If enough time has passed, update the game
  if (elapsed > interval) {

    lastTime = now - (elapsed % interval);

    // Clear the canvas (This always stays at the top)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate the map
    generateMap(backgroundmap);
    generateMap(details);
    generateMap(wallsfloor);

    //Draw the treasure
    drawTreasure();

    // Call keyPress
    keyPress();

    // Draw opponents
    drawOpponents();

    // Draw the player sprite
    drawSprite();

    // Create a user interface
    userInterface();

    // Collect treasure 
    collectTreasure();

    // Check for collisions
    checkCollision();

    betweenRounds();

  }
  // Request next frame
  requestAnimationFrame(gameLoop);
}
