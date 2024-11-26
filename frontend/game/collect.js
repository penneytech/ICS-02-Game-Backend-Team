import { getGlobal, setGlobal } from "../globals.js";

import { getTreasure } from "./treasure.js";

// Define a function to handle a hit detection/collection
function collectGem(data, socket, io) {
    console.log("");
}

// Flags to prevent multiple messages being sent
let hitDetected = false;
let messageSent = false;
const height = 30;
const width = 30;

export function collectTreasure(playerRect, treasureRect) {

    const treasure = getGlobal('treasure');
    const playerposition = getGlobal('playerposition');
    const ctx = getGlobal('ctx');

    treasure.forEach((piece, index) => {
        if ((playerposition.x - width) < piece.x + width &&
            (playerposition.x - width) + playerposition.width > piece.x &&
            (playerposition.y - height) < piece.y + height &&
            (playerposition.y - height) + playerposition.height > piece.y) {
            hitDetected = true;
            let socket = getGlobal('socket');
            console.log("Hit detected with:", piece, index);
            treasure[index].x = - 1000;
            treasure[index].y = - 1000;
            setGlobal('treasure'.treasure);
            socket.emit("gemcollected", index);



        } // End of if statement
    }); // End of foreach

    if (hitDetected == false) {
        messageSent = false;
    }
    hitDetected = false;
} // End of collectTreasure