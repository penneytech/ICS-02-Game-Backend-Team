import { getGlobal } from "../globals.js";

let framecounter = 0;
let framerate = 10;

export function drawSprite() {
  const canvas = getGlobal('canvas');
  const ctx = getGlobal('ctx');
  const characters = getGlobal('characters');
  const playerposition = getGlobal('playerposition');
  const canvasWidth = getGlobal('canvasWidth');
  const canvasHeight = getGlobal('canvasHeight');
  const element = getGlobal('element');

  // Determine which character image to load based on frame count
  const characterIndex = Math.floor(framecounter / framerate);
  const img = characters[getGlobal('character')][element][characterIndex];

  ctx.drawImage(
    img,
    canvasWidth / 2 - (playerposition.width / 2),
    canvasHeight / 2 - (playerposition.height / 2),
    playerposition.width,
    playerposition.height
  );

  // Render player name
  const username = getGlobal('username');
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText(username, canvasWidth / 2, canvasHeight / 2 - playerposition.height / 2 - 10);

  // Increase frame counter
  framecounter++;

  if (framecounter > framerate * 3) {
    framecounter = 0;
  }
}
