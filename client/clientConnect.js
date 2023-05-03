/*
This code defines a function that handles a client connection to the server. When a client connects, it retrieves the array of connected clients from the global variables using the getGlobal function from the 'globals.js' module. It then adds the id of the connected client to the array along with any other relevant client information. It logs the list of connected clients to the console and updates the global variable with the updated array. Finally, it exports the function for other modules to use.
*/

// Import the required functions from the 'globals.js' module
const globals = require('../globals.js');

// Define a function to handle a client connection
function clientConnect(socket) {
  console.log("");
  console.log('A user connected.');

  // Update list of connected clients
  let connectedclients = globals.getGlobal('connectedclients');

  // get leaderboard object from global.js
  let leaderboard = globals.getGlobal('leaderboard');

  // Add the id of the connected client to the array along with any other relevant client information
  connectedclients.push({
    id: socket.id, 
    username: "",
    currentscore: 0,
    // Any other client information here
  });

  // Log the list of connected clients to the console
  console.log('Connected clients:', connectedclients);

  // Update the global variable with the updated array
  globals.setGlobal('connectedclients', connectedclients);

  // send leaderboard to client when they connect
      socket.emit('leaderboard', leaderboard );
}

// Export the function for other modules to use
module.exports = clientConnect;
