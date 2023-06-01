const globals = require('../globals.js');

async function setElement(message, socket) {
  console.log('Setting element for connected client:', socket.id);

  let connectedClients = globals.getGlobal('connectedclients');

  let index = connectedClients.findIndex(client => client.id === socket.id);
  console.log('index', index);
  if (index === -1) {
    console.log('Client not found in connectedclients array.');
    return;
  }

  connectedClients[index].element = message;

  let tempUsername = connectedClients[index].username;
  console.log('tempusername', tempUsername);

  if (tempUsername === '' || tempUsername === 'frontendmonitor') {
    console.log('Client not logged in.');
    return;
  }

  globals.setGlobal('connectedclients', connectedClients);

  const client = globals.getGlobal('mongoDbClient');
  const collection = client.db("game2").collection("game2"); // replace with your DB and collection names

  try {
    const result = await collection.updateOne(
      { username: tempUsername },
      { $set: { element: message } }
    );
    if (result.matchedCount > 0) {
      console.log('Element set for the connected client and updated in MongoDB successfully.');
    } else {
      console.log('User not found in MongoDB.');
    }
  } catch (err) {
    console.error('Error updating element in MongoDB:', err);
  }
}

module.exports = setElement;
