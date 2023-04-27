const fs = require('fs');

function updateLastLoginDate(username) {
  // Read the JSON data from the file
  const data = fs.readFileSync('credentials.json');
  const credentials = JSON.parse(data);

  // Find the user with the specified username
  const userToUpdate = credentials.find(user => user.username === username);

  // If the user is found
  if (userToUpdate) {
    // Update the user's lastlogindate property
    userToUpdate.lastlogindate = new Date().toISOString();

    // Increment the user's numberloginattempts property
    userToUpdate.numberloginattempts += 1;

    // Write the updated credentials array back to the file
    fs.writeFileSync('credentials.json', JSON.stringify(credentials, null, 2));

    console.log(`Updated lastlogindate and numberloginattempts for user ${username}`);
  } else {
    console.log(`User ${username} not found`);
  }
}

// Example usage
updateLastLoginDate('frontendmonitor');
updateLastLoginDate('honeydew');


// Find the user with the username "frontendmonitor"
const userToUpdate = users.find(user => user.username === 'frontendmonitor');

// Update the user's lastlogindate property
userToUpdate.lastlogindate = new Date().toISOString();

// Write the updated data back to the file
fs.writeFileSync('credentials.json', JSON.stringify(users, null, 2));


// Update the user's lastlogindate property
userToUpdate.lastlogindate = new Date().toISOString();

// Write the updated data back to the file
fs.writeFileSync('credentials.json', JSON.stringify(users, null, 2));
