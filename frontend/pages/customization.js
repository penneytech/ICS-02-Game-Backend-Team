import menu from './menu.js';
import { getGlobal, setGlobal } from '../globals.js';

export default function customization() {
    let selectedCharacter = null;
    let selectedElement = null;

    let content = document.getElementById('content');
    content.innerHTML = '';

    const characterBar = document.createElement('div');
    characterBar.id = 'customizationtitle';
    characterBar.innerHTML = 'Choose your Character';

    const characterContainer = document.createElement('div');
    characterContainer.id = 'characterbar';
    characterContainer.innerHTML = '';

    // Character selection buttons
    const socket = getGlobal('socket');

    const characterButton1 = document.createElement('button');
    characterButton1.className = 'characterbutton';
    characterButton1.innerHTML = 'Rogue';
    characterButton1.value = 'SELECT';
    characterButton1.onclick = function () {
        if (selectedCharacter === characterButton1) {
            characterButton1.classList.remove('green');
            selectedCharacter = null;
        } else {
            if (selectedCharacter) {
                selectedCharacter.classList.remove('green');
            }
            characterButton1.classList.add('green');
            selectedCharacter = characterButton1;
        }
        socket.emit('characterselect', 'Rogue');
        setGlobal('character', 'Rogue')
        console.log('The Rogue aspect has been selected!');
    };

    // Append the image to the button
    const CB1I = document.createElement('img');
    CB1I.style.width = '100px';
    CB1I.src = './images/rogue.png';
    characterButton1.appendChild(CB1I);

    // Repeat the same for characterButton2, characterButton3, and characterButton4

    // ...

    const characterButton2 = document.createElement('button');
    characterButton2.className = 'characterbutton';
    characterButton2.innerHTML = 'Mage';
    characterButton2.value = 'SELECT';
    characterButton2.onclick = function () {
        if (selectedCharacter === characterButton2) {
            characterButton2.classList.remove('green');
            selectedCharacter = null;
        } else {
            if (selectedCharacter) {
                selectedCharacter.classList.remove('green');
            }
            characterButton2.classList.add('green');
            selectedCharacter = characterButton2;
        }
        socket.emit('characterselect', 'Mage');
        setGlobal('character', 'Mage');
        console.log('The Mage aspect has been selected!');
    };

    // Append the image to the button
    const CB2I = document.createElement('img');
    CB2I.style.width = '100px';
    CB2I.src = './images/mage.png';
    characterButton2.appendChild(CB2I);

    // Character selection button 3
    const characterButton3 = document.createElement('button');
    characterButton3.className = 'characterbutton';
    characterButton3.innerHTML = 'Knight';
    characterButton3.value = 'SELECT';
    characterButton3.onclick = function () {
        if (selectedCharacter === characterButton3) {
            characterButton3.classList.remove('green');
            selectedCharacter = null;
        } else {
            if (selectedCharacter) {
                selectedCharacter.classList.remove('green');
            }
            characterButton3.classList.add('green');
            selectedCharacter = characterButton3;
        }
        socket.emit('characterselect', 'Knight');
        setGlobal('character', 'Knight');
        console.log('The Knight aspect has been selected!');
    };

    // Append the image to the button
    const CB3I = document.createElement('img');
    CB3I.src = './images/knight.png';
    CB3I.style.width = '100px';
    characterButton3.appendChild(CB3I);

    // Character selection button 4
    const characterButton4 = document.createElement('button');
    characterButton4.className = 'characterbutton';
    characterButton4.innerHTML = 'Archer';
    characterButton4.value = 'SELECT';
    characterButton4.onclick = function () {
        if (selectedCharacter === characterButton4) {
            characterButton4.classList.remove('green');
            selectedCharacter = null;
        } else {
            if (selectedCharacter) {
                selectedCharacter.classList.remove('green');
            }
            characterButton4.classList.add('green');
            selectedCharacter = characterButton4;
        }
        socket.emit('characterselect', 'Archer');
        setGlobal('character', 'Archer');
        console.log('The Archer aspect has been selected!');
    };

    // Append the image to the button
    const CB4I = document.createElement('img');
    CB4I.src = './images/archer.png';
    CB4I.style.width = '100px';
    characterButton4.appendChild(CB4I);


    // Element selection buttons
    const elementContainer = document.createElement('div');
    elementContainer.id = 'characterbar2';
    elementContainer.innerHTML = '';

    const elementBar = document.createElement('div');
    elementBar.id = 'customizationtitle';
    elementBar.innerHTML = 'Choose your Element';

    const elementBContainer = document.createElement('div');
    elementBContainer.id = 'characterbar2';
    elementBContainer.innerHTML = '';

    const elementButton1 = document.createElement('button');
    elementButton1.className = 'characterbutton';
    elementButton1.innerHTML = 'Water';
    elementButton1.value = 'SELECT';
    elementButton1.onclick = function () {
        if (selectedElement === elementButton1) {
            elementButton1.classList.remove('green');
            selectedElement = null;
        } else {
            if (selectedElement) {
                selectedElement.classList.remove('green');
            }
            elementButton1.classList.add('green');
            selectedElement = elementButton1;
        }
        socket.emit('elementselect', 'Water');
        setGlobal('element', 'Water');
        console.log('The Water aspect has been selected!');
    };
    // Append the image to the button
    const EB1I = document.createElement('img');
    EB1I.src = './images/water.png';
    EB1I.style.width = '100px';
    elementButton1.appendChild(EB1I);

    // Repeat the same for elementButton2 and elementButton4

    const elementButton2 = document.createElement('button');
    elementButton2.className = 'characterbutton';
    elementButton2.innerHTML = 'Fire';
    elementButton2.value = 'SELECT';
    elementButton2.onclick = function () {
        if (selectedElement === elementButton2) {
            elementButton2.classList.remove('green');
            selectedElement = null;
        } else {
            if (selectedElement) {
                selectedElement.classList.remove('green');
            }
            elementButton2.classList.add('green');
            selectedElement = elementButton2;
        }
        socket.emit('elementselect', 'Fire');
        setGlobal('element', 'Fire');
        console.log('The Fire aspect has been selected!');
    };

    // Append the image to the button
    const EB2I = document.createElement('img');
    EB2I.src = './images/fire.png';
    EB2I.style.width = '100px';
    elementButton2.appendChild(EB2I);

    // Element selection button 4 (Earth)
    const elementButton4 = document.createElement('button');
    elementButton4.className = 'characterbutton';
    elementButton4.innerHTML = 'Earth';
    elementButton4.value = 'SELECT';
    elementButton4.onclick = function () {
        if (selectedElement === elementButton4) {
            elementButton4.classList.remove('green');
            selectedElement = null;
        } else {
            if (selectedElement) {
                selectedElement.classList.remove('green');
            }
            elementButton4.classList.add('green');
            selectedElement = elementButton4;
        }
        socket.emit('elementselect', 'Earth');
        setGlobal('element', 'Earth');
        console.log('The Earth aspect has been selected!');
    };

    // Append the image to the button
    const EB4I = document.createElement('img');
    EB4I.src = './images/earth.png';
    EB4I.style.width = '100px';
    elementButton4.appendChild(EB4I);

    content.appendChild(characterBar);
    content.appendChild(characterContainer);
    content.appendChild(elementBar);
    content.appendChild(elementContainer);
    characterContainer.appendChild(characterButton1);
    characterContainer.appendChild(characterButton2);
    characterContainer.appendChild(characterButton3);
    characterContainer.appendChild(characterButton4);
    elementContainer.appendChild(elementButton1);
    elementContainer.appendChild(elementButton2);
    elementContainer.appendChild(elementButton4);

    const backButton = document.createElement('button');
    backButton.innerHTML = 'Back';
    backButton.onclick = function () {
        menu();
    };

    content.appendChild(backButton);

    // Highlight current choices green
    const characterselect = getGlobal('character');

    if (characterselect === 'Rogue') {
        characterButton1.classList.add('green');
        selectedCharacter = characterButton1;
    } else if (characterselect === 'Mage') {
        characterButton2.classList.add('green');
        selectedCharacter = characterButton2;
    } else if (characterselect === 'Knight') {
        characterButton3.classList.add('green');
        selectedCharacter = characterButton3;
    } else if (characterselect === 'Archer') {
        characterButton4.classList.add('green');
        selectedCharacter = characterButton4;
    }

    const elementselect = getGlobal('element');

    if (elementselect === 'Water') {
        elementButton1.classList.add('green');
        selectedElement = elementButton1;
    } else if (elementselect === 'Fire') {
        elementButton2.classList.add('green');
        selectedElement = elementButton2;
    } else if (elementselect === 'Earth') {
        elementButton4.classList.add('green');
        selectedElement = elementButton4;
    }
}
