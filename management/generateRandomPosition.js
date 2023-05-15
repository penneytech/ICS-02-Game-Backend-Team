const wallsfloor = require('./wallsfloor.js');

function generateRandomPosition() {

    let tileWidth = 32;
    let tileHeight = 32;
    // Get the width of the map in tiles
    const mapWidth = 40;

    // Get the indexes of tiles labelled as 10
    const tileIndexes = wallsfloor.flatMap((value, index) => value === 10 ? index : []);

    // If no tiles with label 10 exist, return null
    if (tileIndexes.length === 0) {
        return null;
    }

    // Randomly select one of the indexes
    const randomIndex = tileIndexes[Math.floor(Math.random() * tileIndexes.length)];

    // Convert the 1D index to 2D coordinates
    const x = Math.floor((randomIndex % mapWidth) * tileWidth);
    const y = Math.floor(randomIndex / mapWidth) * tileHeight;

    return { x, y };
}

module.exports = generateRandomPosition;