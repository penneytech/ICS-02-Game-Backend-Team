const fs = require("fs");
const credentials = require("../credentials.json");

function loginLimit(data, socket, io) {
  console.log("attempted login:", data.username, data.password);

  // Find the user in the credentials array
  const userIndex = credentials.findIndex((user) => user.username === data.username);

  // If the user is found
  if (userIndex !== -1) {
    // Check if the password matches
    if (credentials[userIndex].password === data.password) {
      console.log("Login successful for user:", data.username);

      // Update the last login date and number of login attempts for the user
      credentials[userIndex].lastlogindate = new Date().toISOString();
      credentials[userIndex].numberloginattempts += 1; // Increment the login attempt count

      // Write the updated credentials array to the credentials.json file
      fs.writeFile("credentials.json", JSON.stringify(credentials, null, 2), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Updated credentials.json with login data for user:", data.username);
        }
      });
    } else {
      console.log("Invalid password for user:", data.username);
      // Increment the number of login attempts for the user in credentials.json
      incrementLoginAttempts(data.username);
    }
  } else {
    console.log("User not found:", data.username);
  }
}

function incrementLoginAttempts(username) {
  // Find the user in the credentials array
  const userIndex = credentials.findIndex((user) => user.username === username);

  // If the user is found
  if (userIndex !== -1) {
    // Increment the login attempt count
    credentials[userIndex].numberloginattempts += 1;

    // Update the last login date for the user
    credentials[userIndex].lastlogindate = new Date().toISOString();

    // Write the updated credentials array to the credentials.json file
    fs.writeFile("credentials.json", JSON.stringify(credentials, null, 2), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Updated credentials.json with login attempt data for user:", username);
      }
    });
  } else {
    console.log("User not found:", username);
  }
}

module.exports = loginLimit;
