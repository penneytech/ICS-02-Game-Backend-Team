/*
This code defines a function that handles a failed login attempt. It takes in a message parameter, logs the message to the console, and updates the HTML of the login message div with the provided message.
*/

export default function loginFail(message) {
  console.log("Received message:", message);
  const loginMessageDiv = document.getElementById('loginmessagediv');
  loginMessageDiv.innerHTML = message;
}
