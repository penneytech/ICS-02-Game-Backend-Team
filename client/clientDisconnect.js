const globals = require('../globals.js');

function clientDisconnect(socket, io) {
    console.log("");
    console.log('[clientDisconnect]: A user disconnected.');

    /********************
   * Update List Of Connected Clients
   **********************/
    
    let connectedclients = globals.getGlobal('connectedclients')

    // Find the index of the disconnected client in the array
    const index = connectedclients.findIndex(client => client.id === socket.id);

    // If the client is found, remove it from the array
    if (index !== -1) {
         console.log('[clientDisconnect]: Socket ID found!', socket.id)
         connectedclients.splice(index, 1);
    }

    // Log the updated list of connected clients
    console.log('[clientDisconnect]: Connected clients:', connectedclients);
    globals.setGlobal('connectedclients', connectedclients);

    // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
    console.log("[clientIdentify]: Sending user ID's:", connectedclients);
    io.to('frontendmonitor').emit('update', connectedclients);
}

// Export the function for other modules to use
module.exports = clientDisconnect;