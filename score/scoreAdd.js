const fs = require('fs');
const path = require('path');
const globals = require('../globals.js');

function scoreAdd() {
  //console.log('Adding client scores to credentials file.');

  let connectedClients = globals.getGlobal('connectedclients');

  connectedClients.forEach(client => {
    let socketId = client.id;
    let clientscore = client.currentscore;
    let tempusername = client.username;

    if (tempusername === '' || tempusername === 'frontendmonitor') {
      //console.log('Client not logged in:', socketId);
      return;
    }

    if (clientscore === 0) {
      //console.log('Score is zero, skipping:', socketId);
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

        // Find the user object that corresponds to the client
        const user = credentials.find(user => user.username === tempusername);

        if (user) {
          // Calculate the top_score by finding the maximum score in the user's achievements
          const top_score = Math.max(...user.userachievement.score.map(entry => entry.score));

          // Calculate the total_points by summing up all the scores in the user's achievements
          const total_points = user.userachievement.score.reduce((sum, entry) => sum + entry.score, 0);

          // Add the top_score and total_points properties to the user object
          user.top_score = top_score;
          user.total_points = total_points;

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

            //console.log('Client score added to credentials file successfully:', socketId);
          });
        } else {
          //console.log('User not found in credentials file:', socketId);
        }
      } catch (err) {
        console.error('Error parsing credentials file:', err);
      }
    });
  });
}

module.exports = scoreAdd;
