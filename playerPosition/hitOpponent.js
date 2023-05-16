const globals = require('../globals.js');

// Map to store hit reports from users
const hitReports = new Map();

function hitOpponent(message, socket, io) {
  console.log('hitOpponent.js', message);

  const { user, hit } = message;

  // Store the hit report in the map
  hitReports.set(user, hit);

  // Check if both users have hit each other
  if (hitReports.has(user) && hitReports.get(user) === user) {
    console.log(`${user} hit ${hit}`);
    // Register the hit logic here

    // Once the hit is registered, remove the hit reports from the map
    hitReports.delete(user);
    hitReports.delete(hit);
  }
}

module.exports = hitOpponent;
