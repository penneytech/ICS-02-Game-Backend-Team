// const globals = require('../globals.js');

// async function loginAttemptsReset() {
//   const client = globals.getGlobal('mongoDbClient');
//   const collection = client.db("game2").collection("game2"); // your DB and collection names

//   setInterval(async () => {
//     await collection.updateMany({}, { $set: { numberloginattempts: 0 } });
//     console.log('Reset numberloginattempts for all users');
//   }, 1 * 30 * 1000);
// }

// module.exports = loginAttemptsReset;
