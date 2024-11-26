import wallsfloor from '../map/wallsfloor.js';
import { getGlobal } from "../globals.js";

export function canMove(direction) {
  const tileSize = getGlobal('tileSize');
  const playerposition = getGlobal("playerposition");
  const padding = tileSize * 0.3; // this can be adjusted as needed
  const paddingbottom = tileSize; // this can be adjusted as needed

  let playerTileX, playerTileY;

//  if (window.innerWidth < 600) {
  
  if (direction === 'up') {
    playerTileX = Math.floor((playerposition.x) / tileSize);
    playerTileY = Math.floor((playerposition.y - padding) / tileSize);
  } else if (direction === 'down') {
    playerTileX = Math.floor((playerposition.x) / tileSize);
    playerTileY = Math.floor((playerposition.y + paddingbottom) / tileSize);
  } else if (direction === 'left') {
    playerTileX = Math.floor((playerposition.x - padding) / tileSize);
    playerTileY = Math.floor((playerposition.y) / tileSize);
  } else if (direction === 'right') {
    playerTileX = Math.floor((playerposition.x + padding) / tileSize);
    playerTileY = Math.floor((playerposition.y) / tileSize);
  }




  const map = wallsfloor;
  const mapWidth = 40;
  const tileIndex = Math.max(0, playerTileY * mapWidth + playerTileX);

  if (map[tileIndex] === 10) {
    return true;
  } else {
    return false;
  }
}
 // }
