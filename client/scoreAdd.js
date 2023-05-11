const fs = require('fs');
const path = require('path');
const globals = require('../globals.js');

function scoreAdd(username, score) {

  let connectedclients = globals.getGlobal('connectedclients');

  // Read the creadentials.json file
  const credentialsPath = path.join(__dirname, '..', 'credentials.json');
  const rawData = fs.readFileSync(credentialsPath);
  const credentials = JSON.parse(rawData);

  // Find the user matching the username
  const userIndex = credentials.findIndex(cred => cred.username === username);

  if (userIndex !== -1) {
    //update score
    credentials[userIndex].userachievement.score += score;

    // Write the updated data back to the credentials.json file
    const updatedData = JSON.stringify(credentials, null, 2);
    fs.writeFileSync(credentialsPath, updatedData);
  }
  else {
    console.log(`username '${username}' not found`);
  }

}

module.exports = scoreAdd;