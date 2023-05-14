const globals = require('../globals.js')

function randomPosition(socket) {

    console.log('Setting Random Position for', socket.id);

// Math function that chooses a random x / y and puts it into an object. 
  x = Math.floor(Math.random() * 6000);   
  y = Math.floor(Math.random() * 6000);
  socket.emit('playerpositioninit', {"x":x, "y":y});

// Return the values
  return {"x":x, "y":y}
}

module.exports = randomPosition;