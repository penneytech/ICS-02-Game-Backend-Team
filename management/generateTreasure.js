const globals = require('../globals.js');
const generateRandomPosition = require('./generateRandomPosition.js');

function generateTreasure(arrayLength) {
  const type = ["Amber", "Ruby", "Sapphire"];
  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    const randomxy = generateRandomPosition( 32, 32);
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
