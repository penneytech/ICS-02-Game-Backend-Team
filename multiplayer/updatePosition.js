globals = require("../globals.js");

function updatePosition(message, socket, io) {

  //console.log('[updateclientposition]:', message);

  // Update the connectedclients global for this socket with the passed x/y params
  let connectedclients = globals.getGlobal('connectedclients');

  let index = connectedclients.indexOf(
    connectedclients.find(object => socket.id === object.id)
  )

  if (index != -1) {
    connectedclients[index].x = message.x;
    connectedclients[index].y = message.y;
  }

  globals.setGlobal('connectedclients', connectedclients);
  
  try {
    io.emit('updateopponentposition', { "username": message.username, "x": message.x, "y": message.y, "type": connectedclients[index].type });
  } catch (error) {
    console.log(error);
  }

  // Update the frontendmonitor with the latest information 
  io.to('frontendmonitor').emit('update', connectedclients);

}

module.exports = updatePosition;










// function clientRemove(socket){
//   socket.emit('remove player', 'username')
// }








