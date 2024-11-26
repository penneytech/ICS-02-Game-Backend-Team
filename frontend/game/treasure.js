import { getGlobal } from "../globals.js";

const playerposition = getGlobal('playerposition')

let gemImages = {};

function loadGemImages() {
    let gemNames = ["Ruby", "Sapphire", "Amber"];
    for (let i = 0; i < gemNames.length; i++) {
        let img = new Image();
        img.src = './images/' + gemNames[i] + '.png';
        gemImages[gemNames[i]] = img;
    }
}

export function getTreasure() {
    return treasure;
}

export function drawTreasure() {

    const ctx = getGlobal('ctx');
    const treasure = getGlobal('treasure');
    const canvasWidth = getGlobal('canvasWidth');
    const canvasHeight = getGlobal('canvasHeight');

    for (let i = 0; i < treasure.length; i++) {
        ctx.beginPath();
        let x = treasure[i].x;
        let y = treasure[i].y;
        x = x - playerposition.x + canvasWidth / 2;
        y = y - playerposition.y + canvasHeight / 2;

        let gemImage = gemImages[String(treasure[i].gem)];
        if (gemImage) {
            ctx.drawImage(gemImage, x, y, 32, 32);
        }
    }
}

loadGemImages();
