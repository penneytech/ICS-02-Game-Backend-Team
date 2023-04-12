const globals = require('../globals.js');
const clientIdentify = require('./clientIdentify.js')
const clientLogin = require('./clientLogin.js')

function clientMessage(data, socket, io) {
    //data = JSON.parse(data);
    
    console.log("");
    console.log('[clientMessage]: Received message:', data);

    
    // Send the message to all connected clients
    io.emit('message', "Test message");
}

// Export the function for other modules to use
module.exports = clientMessage;