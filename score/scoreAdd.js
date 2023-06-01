const path = require('path');
const globals = require('../globals.js');

async function scoreAdd() {
  let connectedClients = globals.getGlobal('connectedclients');

  try {
    const client = globals.getGlobal('mongoDbClient');
    const collection = client.db("game2").collection("game2"); // your DB and collection names

    for (let client of connectedClients) {
      let socketId = client.id;
      let clientscore = client.currentscore;
      let tempusername = client.username;

      if (tempusername === '' || tempusername === 'frontendmonitor') {
        console.log('Client not logged in:', socketId);
        continue;
      }

      if (clientscore === 0) {
        console.log('Score is zero, skipping:', socketId);
        continue;
      }

      const user = await collection.findOne({ username: tempusername });

      if (user) {
        const scoreEntry = {
          score: clientscore,
          datestamp: new Date().toISOString()
        };

        user.userachievement.score.push(scoreEntry);
        user.total_points = user.userachievement.score.reduce((sum, entry) => sum + entry.score, 0);
        user.top_score = Math.max(...user.userachievement.score.map(entry => entry.score));

        await collection.updateOne({ username: tempusername }, { $set: user });
      } else {
        console.log('User not found in credentials:', socketId);
      }

      client.currentscore = 0;
    }

    globals.setGlobal('connectedclients', connectedClients);
    console.log('Client scores added to credentials successfully.');
  } catch (error) {
    console.error('Error updating scores:', error);
  }
}

module.exports = scoreAdd;
