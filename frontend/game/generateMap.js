import { getGlobal, setGlobal } from "../globals.js";

/*
RENDER IMAGES BY MAP
*/

export function generateMap(map) {
  const images = getGlobal('mapimages');
  const canvas = getGlobal("canvas");
  const ctx = getGlobal("ctx");
  const mapWidth = 40;
  const mapHeight = map.length / mapWidth;
  const tileSize = getGlobal('tileSize');
  const renderDistance = 100;
  const playerposition = getGlobal("playerposition");
  const playerTileX = Math.floor(playerposition.x / tileSize);
  const playerTileY = Math.floor(playerposition.y / tileSize);

  const startX = Math.max(playerTileX - renderDistance, 0);
  const endX = Math.min(playerTileX + renderDistance, mapWidth - 1);
  const startY = Math.max(playerTileY - renderDistance, 0);
  const endY = Math.min(playerTileY + renderDistance, mapHeight - 1);

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      const tileX = x * tileSize - playerposition.x + canvas.width / 2;
      const tileY = y * tileSize - playerposition.y + canvas.height / 2;
      if (tileX >= -tileSize && tileX <= canvas.width && tileY >= -tileSize && tileY <= canvas.height) {
        const tileIndex = y * mapWidth + x;

        try {
          if (map[tileIndex] !== undefined) {
            ctx.drawImage(images[map[tileIndex]], tileX, tileY, tileSize, tileSize);
          }
        } catch (e) {
          //console.log('[GenerateMap]: ERROR on ' + tileIndex, e)
        }

      }
    }
  }
}
