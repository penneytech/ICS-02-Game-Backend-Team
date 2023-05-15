const fs = require('fs');
const path = require('path');
const globals = require('../globals.js');

function scoreAdd(socket) {
  console.log('Adding client score to credentials file.', socket.id);

  let connectedclients = globals.getGlobal('connectedclients');

  let index = connectedclients.findIndex(client => client.id === socket.id);
  console.log('index', index);
  if (index === -1) {
    console.log('Client not found in connectedclients array.');
    return;
  }

  let clientscore = connectedclients[index].currentscore;
  console.log('clientscore', clientscore);
  let tempusername = connectedclients[index].username;
  console.log('tempusername', tempusername);

  if (tempusername === '' || tempusername === 'frontendmonitor') {
    console.log('Client not logged in.');
    return;
  }

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
      console.log("CREDENTIALS", credentials);

      // Find the user object that corresponds to the client
      const user = credentials.find(user => user.username === tempusername);

      if (user) {
        // Create an object with the score and datestamp
        const scoreEntry = {
          score: clientscore,
          datestamp: new Date().toISOString()
        };

        // Add the score entry to the user's achievements array
        user.userachievement.score.push(scoreEntry);

        // Convert the updated credentials object back to JSON
        const updatedData = JSON.stringify(credentials, null, 2);

        // Write the updated data back to the credentials file
        fs.writeFile(credentialsPath, updatedData, 'utf8', err => {
          if (err) {
            console.error('Error writing credentials file:', err);
            return;
          }

          console.log('Client score added to credentials file successfully.');
        });
      } else {
        console.log('User not found in credentials file.');
      }
    } catch (err) {
      console.error('Error parsing credentials file:', err);
    }
  });
}

module.exports = scoreAdd;
