const globals = require('../globals.js');
const generateRandomPosition = require('./generateRandomPosition.js');

function generateTreasure(arrayLength) {
    
  const gems = [
    { name: "Amber", value: 10 },
    { name: "Ruby", value: 20 },
    { name: "Sapphire", value: 40 }
  ];

  const occupiedPositions = [];

  const result = [];

  for (let i = 0; i < arrayLength; i++) {
    const randomxy = generateRandomPosition(32, 32, occupiedPositions);
    const randomX = randomxy.x;
    const randomY = randomxy.y;
    occupiedPositions.push(randomxy);
    const gemIndex = Math.floor(Math.random() * gems.length);
    const gem = gems[gemIndex];
    const treasure = { x: randomX, y: randomY, gem: gem.name, value: gem.value };
    result.push(treasure);
  }

  globals.setGlobal('treasure', result);  
    console.log(result)
}

generateTreasure(50);  // Generate 50 new treasures and save the result to the 'treasure' global variable

//