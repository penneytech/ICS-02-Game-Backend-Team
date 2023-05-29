const globals = require('../globals.js')
const generateRandomPosition = require('./generateRandomPosition.js');
const clientScore = require('../score/clientScore.js');

function removingTreasure(treasureindex, socket, io) {

    //console.log("gem collected", treasureindex, socket.id);

    // Add to the client's score
    let treasurevalue = globals.getGlobal('treasure')[treasureindex].value;
    clientScore(treasurevalue, socket, io)

    let randomposition = generateRandomPosition(32, 32);

    let treasure = globals.getGlobal('treasure');
    treasure[treasureindex].x = randomposition.x;
    treasure[treasureindex].y = randomposition.y;
    globals.setGlobal('treasure', treasure);

    io.emit('treasureupdate', {"index": treasureindex, "x": randomposition.x, "y": randomposition.y})

    
}

module.exports = removingTreasure;