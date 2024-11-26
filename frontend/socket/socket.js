/*
This code connects to the server and sets the socket global variable using the io function from the 'socket.io-client' module.
*/

// File and function imports
import { getGlobal, setGlobal } from '../globals.js';
import loginFail from './loginFail.js';
import loginSucceed from './loginSucceed.js';
import moveOpponents from '../opponents/moveOpponents.js';
import opponentRemove from '../opponents/opponentRemove.js';
import generateUserStats from '../pages/generateUserStats.js'

// Connect to the server and set the socket global variable
//const socket = io("https://ics-02-game-backend-team.paulpenney.repl.co");
const socket = io("http://localhost:3000");

setGlobal('socket', socket);


// Timer Message

let lastMessageReceivedTime = Date.now();

// Function to handle the received message
const handleMessage = (message) => {
    console.log("Received message:", message);
    lastMessageReceivedTime = Date.now();
};

// When a message is received from the server
socket.on("message", handleMessage);

// Check if a message hasn't been received in the last 5 seconds
setInterval(() => {
    const currentTime = Date.now();
    const timeSinceLastMessage = currentTime - lastMessageReceivedTime;

    if (timeSinceLastMessage >= 5000) {
        console.log("No message received in the last 5 seconds. Performing an action...");
        let content = document.getElementById("content");
        content.innerHTML = "<div id=subtitle>You have been disconnected from the server. Please refresh the page to reconnect. </div>";
    }
}, 5000);

// Actions that happen when the connection is established
socket.on("connect", () => {
    console.log("Connected to server");
    // Identify with server
    socket.emit("ident", "client");
});

// When a login fails, receive a message from the server
socket.on("loginFailed", (message) => {
    loginFail(message);
});

// When a login succeeds, fetch the gameHTML and start the game
socket.on("loginSucceed", (message) => {
    loginSucceed(message);
});

// // Receive treasure from backend
socket.on("treasureinit", (message) => {
    console.log("treasure set:", message)
    setGlobal('treasure', message)
});

// Get leaderboard from the server
socket.on("leaderboard", (message) => {
    setGlobal('leaderboard', message)
});

// Get ingameleaderboard from the server
socket.on("ingameleaderboard", (message) => {
    setGlobal('ingameleaderboard', message)
});

// Get my score
socket.on("myscore", (message) => {
    setGlobal('myscore', message)
});

// // Receive treasure from backend
socket.on("treasureupdate", (message) => {
    console.log("treasure set:", message)
    let treasure = getGlobal('treasure');
    treasure[message.index].x = message.x;
    treasure[message.index].y = message.y;
    setGlobal('treasure', treasure);
});

// Receive opponent positions from backend
socket.on("clientupdateposition", (message) => {
    moveOpponents(message);
});

// Receive opponent positions from backend
socket.on("userdata", (message) => {
    console.log("userdata:", message);

    setGlobal('userdata', message);
    setGlobal('character', message.character);
    setGlobal('element', message.element);
});

socket.on("clientspawn", (message) => {
    console.log("Recieved Initial Position:", message);
    let playerposition = getGlobal('playerposition');
    playerposition.x = message.x;
    playerposition.y = message.y;
    setGlobal('playerposition', playerposition);
});

// When an opponent is removed,  
socket.on("removeopponent", (message) => {
    console.log("Remove opponent:", message);
    opponentRemove(message);
});

// When the user stats are received,  
socket.on("userstatsdata", (message) => {
    console.log("userstatsdata:", message);
    setGlobal('userstats', message);
    generateUserStats();
});

// Get the round state
socket.on("betweenrounds", (message) => {
    console.log("betweenrounds:", message);
    if (message == true) {
        setGlobal('betweenrounds', true);
        setGlobal('timeleft', 10000)
    } else {
        setGlobal('betweenrounds', false);
        setGlobal('timeleft', 120000);
    }
});

// When the user connects, get time remaining
socket.on("timeleft", (message) => {
    console.log("timeleft:", message);
    setGlobal('timeleft', message);

});

// Reset the score
socket.on("resetscore", () => {
    console.log("reset score");
    let myscore = getGlobal('myscore');
    myscore = 0;
    setGlobal('myscore', myscore);
});