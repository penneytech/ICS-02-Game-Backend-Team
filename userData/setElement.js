const fs = require('fs');
const path = require('path');
const globals = require('../globals.js');

function setElement(message, socket) {
  //console.log('Setting element for connected client:', socket.id);

  let connectedclients = globals.getGlobal('connectedclients');

  let index = connectedclients.findIndex(client => client.id === socket.id);
  //console.log('index', index);
  if (index === -1) {
    //console.log('Client not found in connectedclients array.');
    return;
  }

  connectedclients[index].element = message;

  let tempusername = connectedclients[index].username;
  //console.log('tempusername', tempusername);

  if (tempusername === '' || tempusername === 'frontendmonitor') {
    //console.log('Client not logged in.');
    return;
  }

  globals.setGlobal('connectedclients', connectedclients);

  // Read the credentials file
  const credentialsPath = path.join(__dirname, '../credentials.json');
  fs.readFile(credentialsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading credentials file:', err);
      return;
    }

    try {
      // Parse the JSON data
      const credentials = JSON.parse(data);
      ////console.log("CREDENTIALS", credentials);

      // Find the user object that corresponds to the client
      const user = credentials.find(user => user.username === tempusername);

      if (user) {
        // Set the element for the user
        user.element = message;

        // Convert the updated credentials object back to JSON
        const updatedData = JSON.stringify(credentials, null, 2);

        // Write the updated data back to the credentials file
        fs.writeFile(credentialsPath, updatedData, 'utf8', err => {
          if (err) {
            console.error('Error writing credentials file:', err);
            return;
          }

          //console.log('Element set for the connected client and updated in credentials file successfully.');
        });
      } else {
        //console.log('User not found in credentials file.');
      }
    } catch (err) {
      console.error('Error parsing credentials file:', err);
    }
  });
}

module.exports = setElement;
