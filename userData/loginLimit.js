// const globals = require("../globals.js");

// async function loginLimit(data, socket, io) {
//   const client = globals.getGlobal('mongoDbClient');
//   const collection = client.db("game2").collection("game2"); // replace with your DB and collection names

//   const user = await collection.findOne({ username: data.username });
  
//   // If the user is found
//   if (user) {
//     // Check if the password matches
//     if (user.password === data.password) {
//       console.log("Login successful for user:", data.username);

//       // Update the last login date and number of login attempts for the user
//       await collection.updateOne(
//         { username: data.username },
//         {
//           $set: {
//             lastlogindate: new Date().toISOString(),
//             numberloginattempts: user.numberloginattempts + 1
//           }
//         }
//       );
//     } else {
//       console.log("Invalid password for user:", data.username);
//       await incrementLoginAttempts(data.username, collection);
//     }
//   } else {
//     console.log("User not found:", data.username);
//   }
// }

// async function incrementLoginAttempts(username, collection) {
//   const user = await collection.findOne({ username: username });

//   // If the user is found
//   if (user) {
//     // Increment the login attempt count
//     await collection.updateOne(
//       { username: username },
//       {
//         $set: {
//           lastlogindate: new Date().toISOString(),
//           numberloginattempts: user.numberloginattempts + 1
//         }
//       }
//     );
//   } else {
//     console.log("User not found:", username);
//   }
// }

// module.exports = loginLimit;
