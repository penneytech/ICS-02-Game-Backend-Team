const globals = require("../globals.js");

function clientUpdatePosition(data, socket, io) {

    let connectedclients = globals.getGlobal('connectedclients');
    const clientIndex = connectedclients.findIndex(client => client.id === socket.id);

    // Update the client's position with the new coordinates from the message
    connectedclients[clientIndex].xPosition = data.x;
    connectedclients[clientIndex].yPosition = data.y;

    // Update the global variable with the updated array
    globals.setGlobal('connectedclients', connectedclients);

    // Emit the new position to all clients
    io.emit('updatePosition', {
        username: connectedclients[clientIndex].username,
        xPosition: data.x,
        yPosition: data.y
    });

}
module.exports = clientUpdatePosition;