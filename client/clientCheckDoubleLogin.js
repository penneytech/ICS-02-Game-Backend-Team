const globals = require("../globals.js");


function clientCheckDoubleLogin(data, socket, io) {
    let connectedclients = globals.getGlobal("connectedclients");

    // Search connectedclients to see if data.username exists in any of the connected client objects

    //If match comes back as true, the account is logged in
    let index = connectedclients.findIndex(client => client.username === data.username);

    let match;

    if (index !== -1) {
        //console.log(`Index of "${data.username}" is ${index}`);
        // do something when index is found
        match = true;
        return true;
    } else {
        //console.log(`"${data.username}" not found`);
        // do something when index is not found
        match = false;
        return false;
    }
}

module.exports = clientCheckDoubleLogin;