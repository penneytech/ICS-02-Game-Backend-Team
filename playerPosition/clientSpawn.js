const globals = require("../globals.js");
const generateRandomPosition = require('../management/generateRandomPosition.js');

//get a random number between N and M
function getRandom(N, M) {
  return Math.floor(Math.random() * (M - N + 1)) + N;
}

function clientSpawn(data, socket, io) {

  // //console.log("clientSpawn.js", data)
  // let connectedclients = globals.getGlobal('connectedclients');
  // const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

  // //get random position
  // const position = generateRandomPosition(32, 32);
  // connectedclients[clientIndex].x = position.x;
  // connectedclients[clientIndex].y = position.y;

  // // Update the global variable with the updated array
  // globals.setGlobal('connectedclients', connectedclients);

  // //sent position to client
  // socket.emit('clientspawn', {
  //   username: connectedclients[clientIndex].username,
  //   x: connectedclients[clientIndex].x,
  //   y: connectedclients[clientIndex].y
  // });

}

module.exports = clientSpawn;