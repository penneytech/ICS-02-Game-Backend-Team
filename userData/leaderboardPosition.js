const globals = require("../globals");

async function leaderBoard() {
  const client = globals.getGlobal('mongoDbClient');
  const collection = client.db("game2").collection("game2"); // your DB and collection names

  let users = await collection.find({}).toArray();

  let scores = users.map(user => {
    let totalScore = user.userachievement.score.reduce((sum, obj) => sum + obj.score, 0);
    return { username: user.username, score: totalScore };
  });

  scores = scores.sort((a, b) => b.score - a.score);

  leaderboard = JSON.stringify(scores.slice(0, 10));
  console.log("leaderboard order " + leaderboard);
  globals.setGlobal('leaderboard', leaderboard);

  // Return the top 10 scores
  //return scores.slice(0, 10);
}

module.exports = leaderBoard;
