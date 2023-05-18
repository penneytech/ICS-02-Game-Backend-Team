const wallsfloor = require('./wallsfloor.js');

function generateRandomPosition(tileWidth, tileHeight) {
    // Get the width of the map in tiles
    const mapWidth = 40;

    // Get the indexes of tiles labelled as 10
    const tileIndexes = wallsfloor.flatMap((value, index) => value === 10 ? index : []);
    // If no tiles with label 10 exist, return null
    if (tileIndexes.length === 0) {
        return null;
    }
  
   // while (true) {
        // Randomly select one of the indexes
        const randomIndex = tileIndexes[Math.floor(Math.random() * tileIndexes.length)];

        // Convert the 1D index to 2D coordinates
        const x = Math.floor((randomIndex % mapWidth) * tileWidth);
        const y = Math.floor(randomIndex / mapWidth) * tileHeight;

        // Check if the position is already occupied
        //if (!occupiedPositions.some(pos => pos.x === x && pos.y === y)) {
            return { x, y };
        //} else {
          //  console.log("POSITION ALREADY TAKEN");
        //}
   // }
}

module.exports = generateRandomPosition;