const fs = require('fs');
const globals = require('../globals.js')

function updateCharacters(character, socket) {
    
    console.log('[updateCharacters]:', character, socket.id)
    fs.readFile('credentials.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading credentials.json:', err);
            return;
        }

        // Set the character in connectedclients
        let connectedclients = globals.getGlobal('connectedclients');

        let index = connectedclients.indexOf(connectedclients.find(client => client.id == socket.id))
        console.log(index)
        // Write the character to the credentials json
        if (index != -1) {
            connectedclients[index].type = character;
            globals.setGlobal('connectedclients', connectedclients);
            console.log(connectedclients);
        }

        let credentials = JSON.parse(data);
        let foundUser = false;

        credentials.forEach((user) => {
            if (user.username == connectedclients[index].username) {
                user.type = character;
                foundUser = true;
            }
        });

        if (!foundUser) {
            console.error('User not found:', connectedclients[index].username);
            return;
        }

        fs.writeFile('credentials.json', JSON.stringify(credentials, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to credentials.json:', err);
            } else {
                console.log('Credentials updated successfully.');
            }
        });
    });
}

module.exports = updateCharacters;
