const globals = require('../globals.js');
const ingameleaderboard = require('./ingameleaderboard.js');

function clientScore(message, socket, io) {

  //console.log("clientScore.js", message, socket.id, "socket.id")
  
  let connectedclients = globals.getGlobal('connectedclients');

  // Find the client matching the socket.id
  const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

  if (clientIndex !== -1) {
    // Update the client's currentscore by adding 10
    connectedclients[clientIndex].currentscore += 10;

    // Update the global variable with the updated array
    globals.setGlobal('connectedclients', connectedclients);

    socket.emit('myscore', connectedclients[clientIndex].currentscore);
    io.emit('ingameleaderboard', ingameleaderboard())
  }
}

module.exports = clientScore;