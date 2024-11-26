// Path: opponents\hitDetection.js
import { getGlobal, setGlobal } from "../globals.js";

let lastHitOpponent = null;

export function checkCollision() {
  const socket = getGlobal('socket');
  const userMap = getGlobal('userMap');
  const playerposition = getGlobal('playerposition');
  const canvasWidth = getGlobal('canvasWidth');
  const canvasHeight = getGlobal('canvasHeight');

  // Define hitbox for your character
  const playerHitbox = {
    x: canvasWidth / 2 - (playerposition.width / 2),
    y: canvasHeight / 2 - (playerposition.height / 2),
    width: playerposition.width,
    height: playerposition.height
  };

  let hitOpponent = null;

  userMap.forEach((opponent, opponentId) => {
    if (opponent.username !== getGlobal('username')) {
      let x = opponent.x - playerposition.x + canvasWidth / 2;
      let y = opponent.y - playerposition.y + canvasHeight / 2;

      // Define hitbox for the opponent
      const opponentHitbox = {
        x: x - (playerposition.width / 2),
        y: y - (playerposition.height / 2),
        width: 50,  // Adjust according to your opponent sprite size
        height: 50  // Adjust according to your opponent sprite size
      };

      // Check for a collision between the player and the opponent
      if (playerHitbox.x < opponentHitbox.x + opponentHitbox.width &&
        playerHitbox.x + playerHitbox.width > opponentHitbox.x &&
        playerHitbox.y < opponentHitbox.y + opponentHitbox.height &&
        playerHitbox.height + playerHitbox.y > opponentHitbox.y) {
        hitOpponent = opponent.username;
      }
    }
  });

  // If the hit opponent has changed, log and emit
  if (hitOpponent !== lastHitOpponent && hitOpponent !== null) {
    console.log("HIT OPPONENT:", hitOpponent);
    socket.emit("hitopponent", {"user": getGlobal('username'), "hit": hitOpponent});
    lastHitOpponent = hitOpponent;

    // Reset lastHitOpponent to null after 1 second
    setTimeout(() => {
      lastHitOpponent = null;
    }, 1000);
  }

  return hitOpponent;
}
