const globals = require('../globals.js');
const ingameleaderboard = require('./ingameleaderboard.js');
const generateRandomPosition = require('../management/generateRandomPosition.js');

function collisionScoreLogic(user, hit) {

    console.log(`collisionScoreLogic: ${user} hit ${hit}`);

    let connectedclients = globals.getGlobal('connectedclients');

    // Find each player in the connectedclients array.
    let player1index = connectedclients.indexOf(connectedclients.find(client => client.username == user));
    let player2index = connectedclients.indexOf(connectedclients.find(client => client.username == hit));
    console.log("PlayerHit Indexes", player1index, player2index);

    if (player1index == -1 || player2index == -1) {
        console.log("Player not found in connectedclients array");
        return;
    }

    // Calculate the logic for the hit (Sam C.)

    const player1 = {
        element: connectedclients[player1index].element,
        character: connectedclients[player1index].character,
        points: connectedclients[player1index].currentscore,
    }

    const player2 = {
        element: connectedclients[player2index].element,
        character: connectedclients[player2index].character,
        points: connectedclients[player2index].currentscore,
    }

    console.log("Player1", player1)
    console.log("Player2", player2)

    let winner;
    let damage;
    let maximumdamage = 100;

    if (player1.element == "Fire" && player2.element == "Water") {
        winner = player2;
    } else if (player1.element == "Fire" && player2.element == "Earth") {
        winner = player1;
    } else if (player1.element == "Fire" && player2.element == "Fire") {

    } else if (player1.element == "Water" && player2.element == "Water") {

    } else if (player1.element == "Water" && player2.element == "Fire") {
        winner = player1;
    } else if (player1.element == "Water" && player2.element == "Earth") {
        winner = player2;
    } else if (player1.element == "Earth" && player2.element == "Water") {
        winner = player1;
    } else if (player1.element == "Earth" && player2.element == "Fire") {
        winner = player2;
    } else if (player1.element == "Earth" && player2.element == "Earth") {
    }


    if (player1.character == "Archer" && player2.character == "Knight") {
        damage = 0.25;
    } else if (player1.character == "Archer" && player2.character == "Rogue") {
        damage = 0.75;
    } else if (player1.character == "Archer" && player2.character == "Mage") {
        damage = 0.5;
    } else if (player1.character == "Archer" && player2.character == "Archer") {
        damage = 0;
    } else if (player1.character == "Rogue" && player2.character == "Knight") {
        damage = 0.5;
    } else if (player1.character == "Rogue" && player2.character == "Rogue") {
        damage = 0;
    } else if (player1.character == "Rogue" && player2.character == "Mage") {
        damage = 0.75;
    } else if (player1.character == "Rogue" && player2.character == "Archer") {
        damage = 0.25;
    } else if (player1.character == "Mage" && player2.character == "Knight") {
        damage = 0.75;
    } else if (player1.character == "Mage" && player2.character == "Rogue") {
        damage = 0.25;
    } else if (player1.character == "Mage" && player2.character == "Mage") {
        damage = 0;
    } else if (player1.character == "Mage" && player2.character == "Archer") {
        damage = 0.5;
    } else if (player1.character == "Knight" && player2.character == "Knight") {
        damage = 0;
    } else if (player1.character == "Knight" && player2.character == "Rogue") {
        damage = 0.5;
    } else if (player1.character == "Knight" && player2.character == "Mage") {
        damage = 0.25;
    } else if (player1.character == "Knight" && player2.character == "Archer") {
        damage = 0.75;
    }

    // Update the points of the winner and loser.
    let io = globals.getGlobal('io');

    if (winner == player1) {
        console.log("Player 1 wins", player1.points, player2.points);
        const pointsToSubtract = Math.min(player2.points, maximumdamage * (1 - damage));
        player1.points += pointsToSubtract;
        player2.points -= pointsToSubtract;
        console.log("Points to subtract", pointsToSubtract);

        if (player2.points === 0) {
            const position = generateRandomPosition(32, 32);
            connectedclients[player2index].x = position.x;
            connectedclients[player2index].y = position.y;

            io.to(connectedclients[player2index].id).emit('clientspawn', {
                x: position.x,
                y: position.y,
            });
        }
    } else if (winner == player2) {
        console.log("Player 2 wins", player1.points, player2.points);
        const pointsToSubtract = Math.min(player1.points, maximumdamage * (1 - damage));
        player1.points -= pointsToSubtract;
        player2.points += pointsToSubtract;
        console.log("Points to subtract", pointsToSubtract);

        if (player1.points === 0) {
            const position = generateRandomPosition(32, 32);
            connectedclients[player1index].x = position.x;
            connectedclients[player1index].y = position.y;

            io.to(connectedclients[player1index].id).emit('clientspawn', {
                x: position.x,
                y: position.y,
            });
        }
    } else {
        console.log("Tie");
        return;
    }


    // Set the new scores for each player in the connectedclients array.

    connectedclients[player1index].currentscore = player1.points;
    connectedclients[player2index].currentscore = player2.points;
    console.log("Player1 Points", player1.points, "Player2 Points", player2.points);

    // Emit the new scores to each player
    io.to(connectedclients[player1index].id).emit('myscore', player1.points);
    io.to(connectedclients[player2index].id).emit('myscore', player2.points);

    // Emit the scores to everyone in the game

    // Emit the new position to all clients
    io.emit('clientupdateposition', {
        username: connectedclients[player1index].username,
        x: connectedclients[player1index].x,
        y: connectedclients[player1index].y,
        element: connectedclients[player1index].element,
        character: connectedclients[player1index].character,
        score: connectedclients[player1index].currentscore,
    });
    io.emit('clientupdateposition', {
        username: connectedclients[player2index].username,
        x: connectedclients[player2index].x,
        y: connectedclients[player2index].y,
        element: connectedclients[player2index].element,
        character: connectedclients[player2index].character,
        score: connectedclients[player2index].currentscore,
    });

    io.emit('ingameleaderboard', ingameleaderboard())

    globals.setGlobal('connectedclients', connectedclients);
}

module.exports = collisionScoreLogic;