const fs = require("fs");
const { setGlobal } = require("../globals");

function leaderBoard() {
  // Read the credentials file
  let credentials = fs.readFileSync("./credentials.json");

  // Parse the JSON string to an array of user objects
  let users = JSON.parse(credentials);

  // Map each user object to a new object that contains only the username and score fields
  let scores = users.map(user => {
    return { username: user.username, score: user.userachievement.score };
  });

  // Sort the scores array in descending order by score
  scores = scores.sort((a, b) => b.score - a.score);

  return scores;



}

let leaderboard = JSON.stringify(leaderBoard());

console.log("leaderboard order " + leaderboard);

setGlobal('leaderboard', leaderboard);
module.exports = leaderBoard;