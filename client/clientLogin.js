const globals = require("../globals.js");
const credentials = require("../credentials.json");

function clientLogin(data, socket, io) {
    console.log("");

    // Check if provided username and password match any of the default credentials
    const match = credentials.find(cred =>
        cred.username === data.username &&
        cred.password === data.password
    );

    // If a match is found
    if (match) {
        console.log(socket.id, "Successful login using default credentials! From", socket.id);

        // Send message to the client saying that login was successful
        socket.emit('loginSucceed');

        // Update the random connectedclient to include the user name of the logged in user
        let connectedclients = globals.getGlobal("connectedclients");
        const clientIndex = connectedclients.findIndex(client => client.id === socket.id);
        console.log("[clientLogin]: Client index:", clientIndex);
        if (clientIndex !== -1) {
            console.log("[clientLogin]: Setting name:", socket.id + " - " + data.username);
            connectedclients[clientIndex].username = data.username;
        }

        // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
        console.log("[clientLogin]: Sending user ID's:", connectedclients);
        io.to('frontendmonitor').emit('update', connectedclients);

    } else {
        // No match was found
        console.log(socket.id, "Invalid username or password");

        // Send message to the client saying that login was unsuccessful
        socket.emit('loginFailed', 'Invalid username or password');
    }
}

module.exports = clientLogin;
