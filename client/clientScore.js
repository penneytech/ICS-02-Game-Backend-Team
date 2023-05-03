const globals = require('../globals.js');
const scoreAdd = require('./scoreAdd.js');

function clientScore(message, socket, io) {
  let connectedclients = globals.getGlobal('connectedclients');

  // Find the client matching the socket.id
  const clientIndex = connectedclients.findIndex(client => client.id === socket.id);
 
  if (clientIndex !== -1) {
    // Update the client's currentscore by adding 10
    connectedclients[clientIndex].currentscore += 10;

    //call scoreAdd function
    scoreAdd(connectedclients[clientIndex].username, 10);
    
    // Reset the client's currentscore to 0
    connectedclients[clientIndex].currentscore = 0;

    // Update the global variable with the updated array
    globals.setGlobal('connectedclients', connectedclients);
  }
}

module.exports = clientScore;