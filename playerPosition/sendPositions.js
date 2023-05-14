const globals = require("../globals.js");

function sendPositions(socket, io) {

  let connectedclients = globals.getGlobal('connectedclients');

/*  const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

  io.emit('sendPosition', {
      username: connectedclients[clientIndex].username,
      xPosition: connectedclients[clientIndex].xPosition,
      yPosition: connectedclients[clientIndex].yPosition
  });*/
  
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