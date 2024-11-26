import customization from "./customization.js";
import stats from "./stats.js";
import initGame from "../game/initGame.js";
import generateUserStats from "./generateUserStats.js";
import { getGlobal, setGlobal } from '../globals.js';

export default function menu() {

    let content = document.getElementById('content')
    content.innerHTML = "";

    // Create a container div for the menu
    const menuContainer = document.createElement("div");
    menuContainer.style.display = "flex";
    menuContainer.style.flexDirection = "column";

    // Create three button elements
    const button1 = document.createElement("button");
    button1.textContent = "Play";
    button1.onclick = function () {
        initGame();
    }

    const button2 = document.createElement("button");
    button2.textContent = "Leaderboard";
    button2.onclick = function () {
        stats()
    }

    const button3 = document.createElement("button");
    button3.textContent = "Character Selection";
    button3.onclick = function () {
        customization()
    }

    // Add the buttons to the container
    menuContainer.appendChild(button1);
    menuContainer.appendChild(button2);
    menuContainer.appendChild(button3);



    // Add the container to the page
    content.appendChild(menuContainer);

    let userstatsdiv = document.createElement('userstatsdiv');
    userstatsdiv.id = 'userstatsdiv';
    content.appendChild(userstatsdiv);

    // Request userstats 
    let socket = getGlobal('socket');
    let username = getGlobal('username')

    socket.emit('userstats', username);

}
