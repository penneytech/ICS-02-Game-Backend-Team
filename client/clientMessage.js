/*
This code defines a function that handles messages received from clients. When a message is received, the function logs the message to the console, and sends a 'message' event to all connected clients. The function exports the function for other modules to use.
*/

// Import the required functions and modules
const globals = require('../globals.js');
const clientIdentify = require('./clientIdentify.js')
const clientLogin = require('./clientLogin.js')

// Define a function to handle messages received from clients
function clientMessage(data, socket, io) {
    console.log("");
    console.log('[clientMessage]: Received message:', data);

    // Send the message to all connected clients
    io.emit('message', "Test message");
}

// Export the function for other modules to use
module.exports = clientMessage;
