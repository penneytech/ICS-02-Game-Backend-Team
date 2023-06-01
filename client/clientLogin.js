const globals = require("../globals.js");
const clientSpawn = require("../playerPosition/clientSpawn.js");
const sendPositions = require("../playerPosition/sendPositions.js");
const clientCheckDoubleLogin = require('./clientCheckDoubleLogin.js')
//const clientUserAchievement = require('./clientUserAchievement.js');
const clientSendUserData = require('./clientSendUserData.js');

// Define an object to keep track of logged in users
const loggedInUsers = {};

async function clientLogin(data, socket, io) {

  const client = globals.getGlobal('mongoDbClient');
  const collection = client.db("game2").collection("game2"); // replace with your DB and collection names

  if (clientCheckDoubleLogin(data, socket, io)) {
    socket.emit("loginFailed", "You are already logged in!")
    return;
  }

  // Check if provided username and password match any of the default credentials
  const match = await collection.findOne({ username: data.username, password: data.password });

  // If a match is found
  if (match) {
    clientSendUserData(match, socket);
    socket.emit('loginSucceed');
    clientSpawn(socket);
    sendPositions(socket, io);

    loggedInUsers[socket.id] = data.username;

    let connectedclients = globals.getGlobal("connectedclients");
    const clientIndex = connectedclients.findIndex(client => client.id === socket.id);
    if (clientIndex !== -1) {
      connectedclients[clientIndex].username = data.username;
      connectedclients[clientIndex].element = match.element;
      connectedclients[clientIndex].character = match.character;
    }

    io.to('frontendmonitor').emit('update', connectedclients);

  } else {
    socket.emit('loginFailed', 'Invalid username or password');
  }
}

module.exports = clientLogin;
