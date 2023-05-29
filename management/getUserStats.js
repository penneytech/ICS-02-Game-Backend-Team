const fs = require('fs');

function getUserStats(inputusername) {
  
    console.log('[getUserStats]:', inputusername)

  try {
    const fileContents = fs.readFileSync('credentials.json', 'utf-8');
    const data = JSON.parse(fileContents);
    
    const user = data.find(user => user.username === inputusername);
    if (!user) {
      throw new Error('User not found');
    }

    const { username, lastlogindate, element, character, top_score, total_points, userachievement } = user;
    const totalScore = total_points
    const topScore = top_score
    const historyCount = userachievement.score.length;

    return {
      username,
      lastlogindate,
      element,
      character,
      totalScore,
      topScore,
      historyCount
    };
  } catch (error) {
    console.error('Error reading credentials.json:', error.message);
    return null;
  }
}

module.exports = getUserStats;
