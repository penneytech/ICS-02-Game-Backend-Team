// Emit all player positions to the frontend on client join 
const globals = require("../globals.js");

function initPlayerPositions(socket) {
  console.log("INITPLAYERPOSTION RAN");
  let connectedclients = globals.getGlobal('connectedclients');

  // Create new array of logged in user
  let opponents = [];

  connectedclients.forEach((element, index) => {
    console.log("CHECKING ELEMENT", element)
    if (element.username != '') {
      opponents.push(element)
    }

  });
  console.log("[initPlayerPositions]:", opponents);

  socket.emit('initopponents', opponents)
}

module.exports = initPlayerPositions;