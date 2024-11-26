// Create a function that will create a user interface for the game

import { getGlobal, setGlobal } from "../globals.js";

export function userInterface() {
  const ctx = getGlobal('ctx');
  const canvasWidth = getGlobal('canvasWidth');
  const canvasHeight = getGlobal('canvasHeight');

  ctx.textAlign = 'left';

  // Draw the UI
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvasWidth, 50);

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(430, 0, canvasWidth / 3, canvasHeight / 3);

  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
  ctx.lineWidth = 5;
  ctx.strokeRect(430, 0, canvasWidth / 3, canvasHeight / 3);


  // Draw the score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + getGlobal('myscore'), 20, 30);

  // Get the time in milliseconds
  var timeInMilliseconds = getGlobal('timeleft');

  // Convert milliseconds to seconds
  var seconds = Math.floor(timeInMilliseconds / 1000);

  // Calculate the minutes and seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the time as M:SS
  var formattedTime = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

  // Draw the timer horizontally beside the score
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(formattedTime, 270, 35);

  // Draw the ingameleaderboard on the right hand side
  const ingameleaderboard = getGlobal('ingameleaderboard');
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ingameleaderboard.forEach((player, index) => {
    ctx.fillText(player.username + ": " + player.score, canvasWidth - 150, 50 + (index * 30));
  });




}