const globals = require('../globals.js');

function clientSendUserData(data, socket) {
    console.log(data)

    console.log("clientSendUserData: " + data.character + " " + data.element);
    // Send username to the client
    socket.emit('userdata', {
        "character": data.character,
        "element": data.element
    });

}

module.exports = clientSendUserData;