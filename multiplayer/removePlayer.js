const globals = require('../globals.js');
const writeScore = require('../score/writeScore.js');
const inGameLeaderboard = require('../score/inGameLeaderboard.js');

function removePlayer(socket, io) {

  // Update list of connected clients
  let connectedclients = globals.getGlobal('connectedclients');

  // Find the index of the disconnected client in the array using the socket id
  const index = connectedclients.findIndex(client => client.id === socket.id);

  // If the client is found, remove it from the array
  if (index !== -1) {
    console.log('[clientDisconnect]: Socket ID found!', socket.id)

    if (connectedclients[index].username != '') {
      writeScore(connectedclients[index].username, connectedclients[index].currentscore);
      connectedclients[index].currentscore = 0;
      io.emit('removeopponent', connectedclients[index].username)
      let ingamescore = inGameLeaderboard(connectedclients);
      io.emit('ingameleaderboard', ingamescore);
    }
  }

}

module.exports = removePlayer;