// Define an object to hold the global variables
const globals = {
  connectedclients: [], // A string list of all clients connected
  clients: [], // Array of all websocket clients
  leaderboard: 0, // leaderboard position 
  io: [], // Socket.io
  timeleft: 120000,
  treasure: [
    { "x": 0, "y": 50, "gem": "Emerald", "value": 10 },
    { "x": 0, "y": 100, "gem": "Emerald", "value": 10 },
    { "x": 0, "y": 150, "gem": "Emerald", "value": 10 },
    { "x": 0, "y": 200, "gem": "Emerald", "value": 10 },
    { "x": 0, "y": 250, "gem": "Emerald",   "value": 10 },
    { "x": 0, "y": 300, "gem": "Emerald", "value": 10 },
    { "x": 0, "y": 350, "gem": "Emerald",   "value": 10 },
  ],
}

// Define a function to set a global variable
function setGlobal(name, value) {
  //console.log(`Setting global variable '${name}' to '${value}'`);
  globals[name] = value;
}

// Define a function to get a global variable
function getGlobal(name) {
    // console.log(`Getting global variable '${name}': '${JSON.stringify(globals[name], null, 2)}'`);
    return globals[name];
}

// Export the functions
module.exports = {
  setGlobal,
  getGlobal
};