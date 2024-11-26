import { getGlobal, setGlobal } from "../globals.js";


const characters = getGlobal('characters');

export function initopponents(message) {

    let userMap = getGlobal("userMap");

    // let opponents = message;
    let opponents;

    if (!message) {
        // opponents = getGlobal('opponents');
        return;
    } else {
        opponents = message;
    }

    opponents.forEach((opponent) => {
        // add users to the map
        console.log('initopponents', opponent)
        userMap.set(opponent.username, { x: opponent.x, y: opponent.y, element: opponent.element, character: opponent.character });
    });

    // delete a user by key
    // userMap.delete('john');

    // loop through all remaining users in the map
    userMap.forEach((user, key) => {
        console.log(`${key} ${user.x} ${user.y} ${user.element} ${user.character}`);
    });

    setGlobal('userMap', userMap);
}