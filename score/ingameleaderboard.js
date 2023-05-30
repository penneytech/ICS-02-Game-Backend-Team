const globals = require('../globals.js');

function ingameleaderboard() {
    let connectedclients = globals.getGlobal('connectedclients');
    
    // Sort the array by score
    connectedclients.sort((a, b) => b.currentscore - a.currentscore);
    
    // Return the top 5 objects with username and score properties
    return connectedclients
        .filter(client => client.username && client.username !== 'frontendmonitor')
        .slice(0, 5)
        .map(({ username, currentscore }) => ({ username, score: currentscore }));
}

module.exports = ingameleaderboard;
