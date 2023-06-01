// const globals = require('../globals.js');

// async function clientUserAchievement(data) {
//     console.log('[ClientUserAchievement]: Running...')

//     try {
//         const client = globals.getGlobal('mongoDbClient');
//         const collection = client.db("game2").collection("game2"); // your DB and collection names

//         const user = await collection.findOne({ username: data.username });

//         if (!user) {
//             throw new Error(`Username '${data.username}' does not exist in the database.`);
//         }

//         return user.userachievement;
//     } catch (error) {
//         console.error('Error fetching user achievement:', error.message);
//         return null;
//     }
// }

// module.exports = clientUserAchievement;
