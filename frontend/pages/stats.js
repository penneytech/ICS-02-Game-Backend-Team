import { getGlobal, setGlobal } from '../globals.js';
import menu from './menu.js'

export default function stats() {
    console.log("Stats ran!");

    let players = JSON.parse(getGlobal('leaderboard'));

    console.log('PLAYERS', players[0])

    let content = document.getElementById('content');
    content.innerHTML = "";

    const statsContainer = document.createElement("div");
    statsContainer.style.display = "flex";
    statsContainer.style.flexDirection = "column"


    // Create the table
    const table = document.createElement('table'); // Create a table element

    for (let i = 0; i < players.length; i++) {
        //console.log(players[i]);

        const tr = document.createElement('tr'); // Create a table row element
        const placeTd = document.createElement('td'); // Create a table data element for the "Place" column
        const nameTd = document.createElement('td'); // Create a table data element for the player's name
        const pointsTd = document.createElement('td'); // Create a table data element for the points

        placeTd.textContent = i + 1; // Set the "Place" column to the current array index plus 1
        nameTd.textContent = players[i].username; // Set the player's name in the table
        pointsTd.textContent = players[i].score; // Set the points in the table

        tr.appendChild(placeTd); // Add the "Place" column to the row
        tr.appendChild(nameTd); // Add the player's name column to the row
        tr.appendChild(pointsTd); // Add the points column to the row

        table.appendChild(tr); // Add the row to the table
    }

    statsContainer.appendChild(table);

    // Add a back button
    const backButton = document.createElement('button');
    backButton.innerHTML = "Back";
    backButton.onclick = function () {
        menu();
    }

    // Add back button to container
    statsContainer.appendChild(backButton);

    content.appendChild(statsContainer);
}

const backButton = document.createElement('button')

