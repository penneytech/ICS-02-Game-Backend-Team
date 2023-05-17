/*
This code defines a function that handles a client login attempt.  When a client attempts to log in, the function checks if the provided username and password match any of the default credentials stored in the 'credentials.json' file. If a match is found, the function sends a 'loginSucceed' message to the client, updates the random connected client to include the username of the logged-in user, emits the 'update' event to the 'frontendmonitor' room with the current list of user IDs, and exports the function for other modules to use. If no match is found, the function sends a 'loginFailed' message to the client indicating that the provided credentials were invalid.
*/

// Import the required functions and modules
const globals = require("../globals.js");
const credentials = require("../credentials.json");
const clientSpawn = require("../playerPosition/clientSpawn.js");
const sendPositions = require("../playerPosition/sendPositions.js");
const clientCheckDoubleLogin = require('./clientCheckDoubleLogin.js') 
const clientUserAchievement = require('./clientUserAchievement.js');

// Define an object to keep track of logged in users
const loggedInUsers = {};

function clientLogin(data, socket, io) {
  console.log("");

   if(clientCheckDoubleLogin(data, socket, io)) {
       socket.emit("loginFailed", "You are already logged in!")
       return;
   }

  // Check if provided username and password match any of the default credentials
  const match = credentials.find(cred =>
    cred.username === data.username &&
    cred.password === data.password
  );

  // If a match is found
  if (match) {
    console.log(socket.id, "Successful login using default credentials! From", socket.id);

    // Send message to the client saying that login was successful
    socket.emit('loginSucceed');

     // Call clientSpawn function to assign a random spawn point to the user
    clientSpawn(data, socket, io);
    
    // Send positions of all connected clients to the newly joined user
    sendPositions(socket, io);
   
    clientUserAchievement(data, (userAchievement) => {
      socket.emit('loginSucceed', {
        user: data.username,
        achievement: ''
      });
      socket.emit('getUserAchievement', data.username);
    });
    
    // Update the logged in users object to include the current user
    loggedInUsers[socket.id] = data.username;

    // Update the random connectedclient to include the user name of the logged in user
    let connectedclients = globals.getGlobal("connectedclients");
    const clientIndex = connectedclients.findIndex(client => client.id === socket.id);
    //console.log("[clientLogin]: Client index:", clientIndex);
    if (clientIndex !== -1) {
      console.log("[clientLogin]: Setting name:", socket.id + " - " + data.username);
      connectedclients[clientIndex].username = data.username;
    }

    // Emit the 'update' event to the 'frontendmonitor' room with the current list of user IDs
   // console.log("[clientLogin]: Sending user ID's:", connectedclients);
    io.to('frontendmonitor').emit('update', connectedclients);

  } else {
    // No match was found
    console.log(socket.id, "Invalid username or password");

    // Send message to the client saying that login was unsuccessful
    socket.emit('loginFailed', 'Invalid username or password');
  }
  
// clientSpawn();


  
}



// Export the function for other modules to use
module.exports = clientLogin;