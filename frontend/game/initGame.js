import { getGlobal, setGlobal } from "../globals.js";
import startGame from './game.js';

export default function initGame() {
  try {
    //screenState();

    // Get a reference to the content div
    const contentDiv = document.getElementById("content");

    // Clear the content div
    contentDiv.innerHTML = "";

    // Create a canvas element
    const canvas = document.createElement("canvas");

    // Set the canvas dimensions to 200 x 200
    canvas.width = getGlobal("canvasWidth");
    canvas.height = getGlobal("canvasHeight");

    // Give the canvas an id of "myCanvas"
    canvas.id = "myCanvas";

    // Append the canvas to the content div
    contentDiv.appendChild(canvas);

    // Create the canvas context
    const ctx = canvas.getContext("2d");

    // Set the canvas and context as global variables
    setGlobal('canvas', canvas);
    setGlobal('ctx', ctx);

    // Start the game
    startGame();
  } catch (error) {
    console.error("An error occurred while initializing the game:", error);
    // Handle the error here or re-throw it if necessary
  }
}
