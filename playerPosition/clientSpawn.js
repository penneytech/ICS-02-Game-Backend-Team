const globals = require("../globals.js");

//get a random number between N and M
function getRandom(N, M) {
  return Math.floor(Math.random() * (M - N + 1)) + N;
}

function clientSpawn(data, socket, io) {
  let connectedclients = globals.getGlobal('connectedclients');
  const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

  //get random position
  connectedclients[clientIndex].xPosition = getRandom(0, 600);
  connectedclients[clientIndex].yPosition = getRandom(0, 600);

  // Update the global variable with the updated array
  globals.setGlobal('connectedclients', connectedclients);

  //sent position to client
  socket.emit('clientSpawn', {
    username: connectedclients[clientIndex].username,
    xPosition: connectedclients[clientIndex].xPosition,
    yPosition: connectedclients[clientIndex].yPosition
  });

}

module.exports = clientSpawn;