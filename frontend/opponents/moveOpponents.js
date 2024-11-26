import { getGlobal, setGlobal } from "../globals.js";

export default function moveOpponents(message) {
    //console.log("moveOpponents.js: moveOpponents() called.", message);
    let userMap = getGlobal('userMap'); // Assuming userMap is a dictionary with usernames as keys.

    // Parse the message if it's a string
    if (typeof message === "string") {
        message = JSON.parse(message);
    }

    // If the user exists in the map, update the user's properties.
    if (userMap.has(message.username)) {
        userMap.get(message.username).x = message.x;
        userMap.get(message.username).y = message.y;
        userMap.get(message.username).element = message.element;
        userMap.get(message.username).character = message.character;
        userMap.get(message.username).score = message.score;
    } else {
        // If the user doesn't exist in the map, add them to the map.
        userMap.set(message.username, {
            username: message.username,
            x: message.x,
            y: message.y,
            element: message.element,
            character: message.character,
        });
    }

    // Update the global userMap with the modified userMap.
    setGlobal('userMap', userMap);
}
