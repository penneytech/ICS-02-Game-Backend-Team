const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // You can restrict this to specific domains if needed.
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// Our Imports
const globals = require('./globals.js');
const clientConnect = require('./client/clientConnect.js');
const clientIdentify = require('./client/clientIdentify.js')
const clientLogin = require('./client/clientLogin.js');
const clientMessage = require('./client/clientMessage.js');
const clientDisconnect = require('./client/clientDisconnect.js');
const leaderBoard = require('./userData/leaderboardPosition.js');
const removingTreasure = require('./management/removingTreasure.js')
const hitOpponent = require('./playerPosition/hitOpponent.js');
const setCharacter = require('./userData/setCharacter.js');
const setElement = require('./userData/setElement.js');
const getUserStats = require('./management/getUserStats.js')

// GENERATE TREASURE ON SERVER START
require('./management/generateTreasure.js');

// START TIMER
require('./rounds/roundTimer.js')

const scoreAdd = require('./score/scoreAdd.js');
const clientUpdatePosition = require('./playerPosition/clientUpdatePosition.js');
const clientUserAchievement = require('./client/clientUserAchievement.js');

// CONNECTION DETAILS
let intervalID;
io.on('connection', (socket) => {

  // Handle Client Connections
  clientConnect(socket, io);

  // Handle Client Messages
  socket.on('ident', (message) => {
    clientIdentify(message, socket, io)
  });

  socket.on('login', (message) => {
    clientLogin(message, socket, io)
  });

  // Handle Client Messages
  socket.on('message', (message) => {
    clientMessage(message, socket, io)
  });

  // Gem Collected Variable
  socket.on('gemcollected', (message) => {
    removingTreasure(message, socket, io);
  });

  // Handles user data position
  socket.on('updateposition', (data) => {
    ////console.log(`Received player position: ${JSON.stringify(data)}`);
    clientUpdatePosition(data, socket, io);
  });

  // Setting character
  socket.on('characterselect', (message) => {
    //console.log("characterselect", message);
    setCharacter(message, socket);
  });

  // Setting element
  socket.on('elementselect', (message) => {
    setElement(message, socket);
  });

  // Hitting An Opponent
  socket.on('hitopponent', (message) => {
    hitOpponent(message, socket, io);
  });


  // Handle Client Disconnections
  socket.on('disconnect', () => {
    scoreAdd(socket);
    clientDisconnect(socket, io);
  });

  socket.on('userstats', (message) => {
    socket.emit('userstatsdata', getUserStats(message))
  });

  // Handle client requests for user achievement
  socket.on('getUserAchievement', (username) => {
    //console.log('[Server]: Received getUserAchievement request for user:', username);
    const userAchievement = clientUserAchievement({ username: username });
    // Emit the user achievement data back to the client
    socket.emit('userAchievement', userAchievement);
  });

  // Start sending test messages to all clients in the 'users' room
  if (!intervalID) {
    intervalID = setInterval(() => {
      ////console.log("Test message sent to users")
      io.to('user').emit(
        'message',
        'This is a test message from the server!');
    }, 3000);
  }
});

server.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
});

leaderBoard();