/********************
Even the backend has a frontend - all the files in the 'public' folder are a frontend client that displays a list of currently logged in and connected clients. The code below connects to the backend server, registers itself as 'frontendmonitor', and receives client data when a user joins or leaves the server.
**********************/

const socket = io();

// On initial connection
socket.on("connect", () => {
    console.log("Connected to server");

    //Identify with the backend server as "frontendmonitor"
    socket.emit("ident", "frontendmonitor");

    // Login with the frontendmonitor credentials
    socket.emit("login", {
        username: "frontendmonitor",
        password: "password"
    })
});

// When a new client list is received
socket.on("update", (data) => {
    console.log("Received client from server", data);

    // Get the client data 
    let connectedClients = data;
    const clientTable = document.getElementById("connected-clients");

    // Clear the previous table rows
    clientTable.innerHTML = "";

    // Add the header row
    const headerRow = document.createElement("tr");
    const idHeader = document.createElement("th");
    const usernameHeader = document.createElement("th");
    idHeader.textContent = "ID";
    usernameHeader.textContent = "Username";
    headerRow.appendChild(idHeader);
    headerRow.appendChild(usernameHeader);
    clientTable.appendChild(headerRow);

    // Add the new table rows
    connectedClients.forEach((clientID) => {
        const tableRow = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = clientID.id;
        tableRow.appendChild(idCell);

        const usernameCell = document.createElement("td");
        usernameCell.textContent = clientID.username;
        tableRow.appendChild(usernameCell);

        clientTable.appendChild(tableRow);
    });
});

// On disconnect
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});