const socket = io();

// Create a reference to the canvas element
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

// Function to scale the real map coordinates to canvas coordinates
function scaleCoordinates(x, y) {
    const scalex = 400 / 1280; // Scale factor based on canvas size and real map size
    const scaley = 600 / 1920; // Scale factor based on canvas size and real map size

    const scaledX = x * scalex;
    const scaledY = y * scaley;
    return { x: scaledX, y: scaledY };
}

// Function to render the players' dots on the canvas
function renderPlayers(players) {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Iterate over the players and render their dots
    players.forEach((player) => {
        if (player.username === "frontendmonitor" || player.username === "") {
            return; // Skip rendering for frontendmonitor or empty username
        }

        const { x, y } = scaleCoordinates(player.x, player.y);

        // Render a dot at the player's location
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.closePath();

        // Display username as text underneath the dot
        context.font = "12px Arial";
        context.textAlign = "center";
        context.fillStyle = "black";
        context.fillText(player.username, x, y + 15);
    });
}



// On initial connection
socket.on("connect", () => {
    //console.log("Connected to server");

    // Identify with the backend server as "frontendmonitor"
    socket.emit("ident", "frontendmonitor");

    // Login with the frontendmonitor credentials
    socket.emit("login", {
        username: "frontendmonitor",
        password: "password"
    });
});

// When a new client list is received
socket.on("update", (data) => {
    //console.log("Received client from server", data);

    // Get the client data
    let connectedClients = data;
    renderPlayers(connectedClients);

    const clientTable = document.getElementById("connected-clients");

    // Clear the previous table rows
    clientTable.innerHTML = "";

    // Add the header row
    const headerRow = document.createElement("tr");
    const usernameHeader = document.createElement("th");
    const xHeader = document.createElement("th"); // New column for X
    const yHeader = document.createElement("th"); // New column for Y
    const scoreHeader = document.createElement("th"); // New column for score

    usernameHeader.textContent = "Username";
    xHeader.textContent = "X"; // New column label for X
    yHeader.textContent = "Y"; // New column label for Y
    scoreHeader.textContent = "Score"; // New column label for score

    headerRow.appendChild(usernameHeader);
    headerRow.appendChild(xHeader); // Add the new column header for X
    headerRow.appendChild(yHeader); // Add the new column header for Y
    headerRow.appendChild(scoreHeader); // Add the new column header for score

    clientTable.appendChild(headerRow);

    // Add the new table rows
    connectedClients.forEach((clientID) => {
        const tableRow = document.createElement("tr");

        const usernameCell = document.createElement("td");
        usernameCell.textContent = clientID.username;
        tableRow.appendChild(usernameCell);

        const xCell = document.createElement("td"); // New cell for X
        xCell.textContent = clientID.x; // Assuming the client data contains the value for X
        tableRow.appendChild(xCell);

        const yCell = document.createElement("td"); // New cell for Y
        yCell.textContent = clientID.y; // Assuming the client data contains the value for Y
        tableRow.appendChild(yCell);

        const scoreCell = document.createElement("td"); // New cell for score
        scoreCell.textContent = clientID.currentscore; // Assuming the client data contains the value for score
        tableRow.appendChild(scoreCell);

        clientTable.appendChild(tableRow);
    });
});

// On disconnect
socket.on("disconnect", () => {
    //console.log("Disconnected from server");
});
