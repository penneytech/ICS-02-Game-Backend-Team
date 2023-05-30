const globals = require("../globals.js");

function sendPositions(socket, io) {

  let connectedclients = globals.getGlobal('connectedclients');

  const positions = connectedclients
    .filter(client => client.username !== "")
    .map(client => ({
      username: client.username,
      xPosition: client.xPosition,
      yPosition: client.yPosition
    }));

  socket.emit('sendPositions', positions);

}

module.exports = sendPositions;