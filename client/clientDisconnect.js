/*
This code defines a function that handles a client disconnection from the server. When a client disconnects, it retrieves the array of connected clients from the global variables using the getGlobal function from the 'globals.js' module. It then finds the index of the disconnected client in the array using the id of the disconnected socket. If the client is found in the array, it removes it from the array and logs the updated list of connected clients to the console. Finally, it emits the 'update' event to the 'frontendmonitor' room with the current list of user IDs and exports the function for other modules to use.
*/

// Import the required functions from the 'globals.js' module
const globals = require('../globals.js');

// Define a function to handle a client disconnection
function clientDisconnect(socket, io) {

  globals.setGlobal('io', io);

  //console.log("");
  //console.log('[clientDisconnect]: A user disconnected.');

  // Update list of connected clients
  let connectedclients = globals.getGlobal('connectedclients');

  // Find the index of the disconnected client in the array using the socket id
  const index = connectedclients.findIndex(client => client.id === socket.id);

  // If the client is found, remove it from the array
  if (index !== -1) {
    let connectedclients = globals.getGlobal('connectedclients');

    //console.log('[clientDisconnect]: Socket ID found!', socket.id)
    // Log the updated list of connected clients to the console
    io.emit('removeopponent', connectedclients[index].username);
    // Remove the client from the array
    connectedclients.splice(index, 1);
  } else {
    //console.log('[clientDisconnect]: Socket ID not found!', socket.id)
    return;
  }
  const ingameleaderboard = require('../score/ingameleaderboard.js');
  io.emit('ingameleaderboard', ingameleaderboard())


  // Update the global variable with the updated array
  globals.setGlobal('connectedclients', connectedclients);

  // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
  // //console.log("[clientIdentify]: Sending user ID's:", connectedclients);
  io.to('frontendmonitor').emit('update', connectedclients);
}

// Export the function for other modules to use
module.exports = clientDisconnect;
