const fs = require("fs");
const { setGlobal } = require("../globals");

function leaderBoard() {
  // Read the credentials file
  let credentials = fs.readFileSync("./credentials.json");

  // Parse the JSON string to an array of user objects
  let users = JSON.parse(credentials);

  // Map each user object to a new object that contains the username and the sum of scores
  let scores = users.map(user => {
    let totalScore = user.userachievement.score.reduce((sum, obj) => sum + obj.score, 0);
    return { username: user.username, score: totalScore };
  });

  // Sort the scores array in descending order by score
  scores = scores.sort((a, b) => b.score - a.score);

  // Return the top 10 scores
  return scores.slice(0, 10);
}

let leaderboard = JSON.stringify(leaderBoard());

//console.log("leaderboard order " + leaderboard);

setGlobal('leaderboard', leaderboard);
module.exports = leaderBoard;
