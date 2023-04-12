const globals = require("../globals.js");

function clientIdentify(data, socket, io) {
  console.log("");
  console.log("[clientIdentify]: Ident", data);

    /********************
   * Add client either to frontend or users
   **********************/

  if (data == "frontendmonitor") {
    console.log('frontend detected');
    // Add the client to the 'frontendmonitor' room
    socket.join('frontendmonitor');
  } else {
    socket.join('user');
  }
    // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
    let connectedclients = globals.getGlobal("connectedclients");
    console.log("[clientIdentify]: Sending user ID's:", connectedclients);
    io.to('frontendmonitor').emit('update', connectedclients);
}

module.exports = clientIdentify;