const globals = require('../globals.js');
const collisionScoreLogic = require('../score/collisionScoreLogic.js');

// Map to store hit reports from users
const hitReports = new Map();

function hitOpponent(message, socket, io) {
  //console.log('hitOpponent.js', message);

  const { user, hit } = message;

  // Store the hit report in the map
  hitReports.set(user, hit);

  // Check if both users have hit each other
  if (hitReports.has(user) && hitReports.get(user) === hit) {
    
    // Register the hit logic here
    collisionScoreLogic(user, hit);
      
    // Once the hit is registered, remove the hit reports from the map
    hitReports.delete(user);
    hitReports.delete(hit); // Delete the entry for the opponent
  }
}

module.exports = hitOpponent;
