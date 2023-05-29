/*
This code defines a function that handles a client identification to the server. When a client identifies itself, the function adds the client to either the 'frontendmonitor' or the 'user' room depending on the identification data. It then emits the 'update' event to the 'frontendmonitor' room with the current list of user IDs and exports the function for other modules to use.
*/

// Import the required functions from the 'globals.js' module
const globals = require("../globals.js");

// Define a function to handle a client identification
function clientIdentify(data, socket, io) {
  //console.log("");
  //console.log("[clientIdentify]: Ident", data);

  // Add client either to frontend or users
  if (data == "frontendmonitor") {
    //console.log('frontend detected');
    // Add the client to the 'frontendmonitor' room
    socket.join('frontendmonitor');
  } else {
    socket.join('user');
  }

  // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
  let connectedclients = globals.getGlobal("connectedclients");
  ////console.log("[clientIdentify]: Sending user ID's:", connectedclients);
  io.to('frontendmonitor').emit('update', connectedclients);
}

// Export the function for other modules to use
module.exports = clientIdentify;
