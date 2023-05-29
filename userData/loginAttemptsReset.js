const fs = require('fs');
const path = require('path');

function loginAttemptsReset(){

const credentialsPath = path.join(__dirname, '..', 'credentials.json');

setInterval(() => {
  // Read the JSON data from the file
  const data = fs.readFileSync(credentialsPath);
  const credentials = JSON.parse(data);

  // Reset the numberloginattempts property for each user to 0
  credentials.forEach(user => user.numberloginattempts = 0);

  // Write the updated credentials array back to the file
  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));

  //console.log('Reset numberloginattempts for all users');
}, 1 * 30 * 1000);

}

module.exports = loginAttemptsReset;