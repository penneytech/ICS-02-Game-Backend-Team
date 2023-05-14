const globals = require('../globals.js');
const wallsfloor = require('./wallsfloor.js');

function generateTreasure(arrayLength) {
  const type = ["Amber", "Ruby", "Sapphire"];
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
     const randomxy =  generateRandomPosition(wallsfloor, 32, 32);
    //const randomX = Math.floor(Math.random() * 1280);
    //const randomY = Math.floor(Math.random() * 1920);
        const randomX = randomxy.x
    const randomY = randomxy.y
    const gemIndex = Math.floor(Math.random() * type.length);
    const gemName = type[gemIndex];
    const gem = { x: randomX, y: randomY, gem: gemName };
    result.push(gem);
  }    
  
  return result;
}

const result = generateTreasure(125);
globals.setGlobal('treasure', result);



function generateRandomPosition(wallsfloor, tileWidth, tileHeight) {
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