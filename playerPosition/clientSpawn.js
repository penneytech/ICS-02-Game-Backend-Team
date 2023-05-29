const globals = require("../globals.js");
const generateRandomPosition = require('../management/generateRandomPosition.js');

function clientSpawn(socket) {
  console.log("clientSpawn called")

  let connectedclients = globals.getGlobal('connectedclients');
  const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

  //get random position
  const position = generateRandomPosition(32, 32);
  connectedclients[clientIndex].x = position.x;
  connectedclients[clientIndex].y = position.y;

  // Update the global variable with the updated array
  globals.setGlobal('connectedclients', connectedclients);

  //sent position to client
  socket.emit('clientspawn', {
    x: connectedclients[clientIndex].x,
    y: connectedclients[clientIndex].y
  });

  console.log('socket emit', {
    x: connectedclients[clientIndex].x,
    y: connectedclients[clientIndex].y
  })

}

module.exports = clientSpawn;