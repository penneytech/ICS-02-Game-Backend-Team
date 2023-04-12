const globals = require('../globals.js');

function clientConnect(socket) {
    console.log("");
    console.log('A user connected.');
    
   /********************
   * Update List Of Connected Clients
   **********************/

    let connectedclients = globals.getGlobal('connectedclients')
    // Add the id of the connected client to the array
    connectedclients.push({
        id: socket.id, 
        username: "",
        // Any other client information here
    });
    // Log the list of connected clients
    console.log('Connected clients:', connectedclients);
    globals.setGlobal('connectedclients', connectedclients);
    
}

// Export the function for other modules to use
module.exports = clientConnect;