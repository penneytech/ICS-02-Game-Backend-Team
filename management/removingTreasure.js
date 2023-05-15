const globals = require('../globals.js')
const generateRandomPosition = require('./generateRandomPosition.js');

function removingTreasure(treasureindex, socket, io) {

    console.log("gem collected", treasureindex, socket.id);

    let randomposition = generateRandomPosition();
    console.log("New Random Pos:", randomposition)

    let treasure = globals.getGlobal('treasure');
    treasure[treasureindex].x = randomposition.x;
    treasure[treasureindex].y = randomposition.y;
    globals.setGlobal('treasure', treasure);

    io.emit('treasureupdate', {"index": treasureindex, "x": randomposition.x, "y": randomposition.y})
    
}

module.exports = removingTreasure;