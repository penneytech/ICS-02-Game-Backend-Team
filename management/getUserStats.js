const globals = require("../globals.js");

async function getUserStats(inputusername) {
  
    console.log('[getUserStats]:', inputusername)
    
    try {
        const client = globals.getGlobal('mongoDbClient');
        const collection = client.db("game2").collection("game2"); // your DB and collection names
        
        const user = await collection.findOne({ username: inputusername });
        
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
        console.error('Error reading user data:', error.message);
        return null;
    }
}

module.exports = getUserStats;
