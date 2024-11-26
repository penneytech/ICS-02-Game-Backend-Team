/*
This code sets up the login functionality for the webpage. It creates a login form with two input fields for the username and password, as well as a send button to initiate the login process. The send button has an onclick event listener attached to it that retrieves the socket global variable and the contents of the username and password fields. It then sends a login event to the server with the provided credentials. Finally, it appends the login form and message div to the content div.
*/

// Import the required functions from the 'globals.js' module


import { getGlobal, setGlobal } from '../globals.js';

export default function loginDialogue() {

  // Get the 'content' div element
  const content = document.getElementById('content');
  content.innerHTML = "";

  // Create a 'login' div element that holds all the elements below
  const loginDiv = document.createElement('div');
  loginDiv.id = "logindiv";

  // Create the username input element
  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('type', 'text');
  usernameInput.setAttribute('id', 'username');
  usernameInput.setAttribute('placeholder', 'Enter Username...');
  loginDiv.appendChild(usernameInput);

  // Create the password input element
  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'text');
  passwordInput.setAttribute('id', 'password');
  passwordInput.setAttribute('placeholder', 'Enter Password...');
  loginDiv.appendChild(passwordInput);

  // Create the send button element and add an onclick event listener
  const sendButton = document.createElement('button');
  sendButton.setAttribute('id', 'sendButton');
  sendButton.innerHTML = 'Connect';
  loginDiv.appendChild(sendButton);

  sendButton.onclick = function() {
    // Get the socket global variable
    const socket = getGlobal('socket');

    // Retrieve the contents of the username and password fields
    const usernameinput = document.getElementById("username");
    const username = usernameinput.value;
    const passwordinput = document.getElementById("password");
    const password = passwordinput.value;

    // Log the login information to the console
    console.log("[login.js]: Sent Login Information:", username, password);

    // Set the username global variable
    setGlobal('username', usernameinput.value);

    // Send a login event to the server with the provided credentials
    socket.emit("login", {
      username: username,
      password: password
    });
  };

  // Create a div that displays a message if login fails
  const loginMessageDiv = document.createElement('div');
  loginMessageDiv.id = "loginmessagediv";

  // Append the login form and message div to the content div
  content.appendChild(loginDiv);
  content.appendChild(loginMessageDiv);
}