// Import required modules and functions
const globals = require('../globals.js');
const clientIdentify = require('./clientIdentify.js');
const credentials = require("../credentials.json");

// Define function to handle user achievement messages
function clientUserAchievement(data) {
    console.log('[ClientUserAchievement]: Running...', credentials)

    //const username = 'honeydew';

    const userAchievement = findUserAchievement(credentials, data.username);

    console.log(userAchievement); // --> { "score": 1000 }
    
    return userAchievement;


  
}

function findUserAchievement(array, username) {
    let foundUser = {};

    for (let i = 0; i < array.length; i++) {
        if (array[i].username === username) {
            foundUser = array[i];
            break;
        }
    }

    if (Object.keys(foundUser).length === 0) {
        console.log(`Username '${username}' does not exist in the array.`);
        return;
    }

    return foundUser.userachievement;
}

// Export the function for use in other modules
module.exports = clientUserAchievement;
