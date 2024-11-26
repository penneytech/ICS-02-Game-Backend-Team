import { getGlobal, setGlobal } from "../globals.js";
import { canMove } from "./canMove.js"
import { moveJoystick } from "./joystick.js";

let speed = getGlobal("speed");

let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

let length = getGlobal("mapLength");
let width = getGlobal("mapWidth");

let playerpositionold = { "x": 100, "y": 100 };


// Add event listeners for key presses
document.addEventListener("keydown", function (event) {

  if (event.code === "KeyA") {
    leftPressed = true;
  } else if (event.code === "KeyD") {
    rightPressed = true;
  } else if (event.code === "KeyW") {
    upPressed = true;
  } else if (event.code === "KeyS") {
    downPressed = true;
  }

});

document.addEventListener("keyup", function (event) {

  if (event.code === "KeyA") {
    leftPressed = false;
  } else if (event.code === "KeyD") {
    rightPressed = false;
  } else if (event.code === "KeyW") {
    upPressed = false;
  } else if (event.code === "KeyS") {
    downPressed = false;
  }

});

export function keyPress() {

  let betweenrounds = getGlobal("betweenrounds");
  let playerposition = getGlobal('playerposition');
  let diagonalSpeed = speed / Math.sqrt(2);

  if (leftPressed && upPressed && canMove('left') && canMove('up') && betweenrounds == false) {
    playerposition.x -= diagonalSpeed;
    playerposition.y -= diagonalSpeed;
  } else if (leftPressed && downPressed && canMove('left') && canMove('down') && betweenrounds == false) {
    playerposition.x -= diagonalSpeed;
    playerposition.y += diagonalSpeed;
  } else if (rightPressed && upPressed && canMove('right') && canMove('up') && betweenrounds == false) {
    playerposition.x += diagonalSpeed;
    playerposition.y -= diagonalSpeed;
  } else if (rightPressed && downPressed && canMove('right') && canMove('down') && betweenrounds == false) {
    playerposition.x += diagonalSpeed;
    playerposition.y += diagonalSpeed;
  } else if (leftPressed && canMove('left') && betweenrounds == false) {
    playerposition.x -= speed;
  } else if (rightPressed && canMove('right') && betweenrounds == false ) {
    playerposition.x += speed;
  } else if (upPressed && canMove('up') && betweenrounds == false) {
    playerposition.y -= speed;
  } else if (downPressed && canMove('down') && betweenrounds == false) {
    playerposition.y += speed;
  } else {
    moveJoystick();
  }

  // Limit the movement of the sprite within the map
  if (playerposition.x <= 0) {
    playerposition.x = 0;
  }
  if (playerposition.y <= 0) {
    playerposition.y = 0;
  }
  if (playerposition.x >= width) {
    playerposition.x = width;
  }
  if (playerposition.y >= length) {
    playerposition.y = length;
  }

  // Check to see if playerposition has updated. 

  if (JSON.stringify(playerpositionold) !== JSON.stringify({ "x": playerposition.x, "y": playerposition.y })) {
    let socket = getGlobal('socket');
    //console.log("EMIT NEW POSITION", { "x": playerposition.x, "y": playerposition.y });
    playerpositionold = { "x": playerposition.x, "y": playerposition.y };
    setGlobal('playerposition', playerposition);
    
    socket.emit("updateposition", {
      'username': getGlobal('username'),
      "x": Math.round(playerposition.x),
      "y": Math.round(playerposition.y),
      "element": getGlobal('element'),
      "character": getGlobal('character'),
    })

    setGlobal('playerposition', playerposition);
  }
}

// Joystick Code