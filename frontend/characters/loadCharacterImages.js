import { setGlobal } from "../globals.js";

// List of folders that contain the character images (four images per character)
let characters = ['Mage', 'Knight', 'Rogue', 'Archer'];

// List of subfolders for each character
let subfolders = ['Water', 'Fire', 'Earth'];

let characterimages = {}

export function loadCharacterImages() {
  return new Promise((resolve) => {
    console.log("LOADING IMAGES");

    let numLoaded = 0;
    let numImages = characters.length * 4 * subfolders.length;

    characters.forEach((character, index) => {
      characterimages[character] = {};

      subfolders.forEach((subfolder) => {
        characterimages[character][subfolder] = [];

        for (let i = 0; i < 4; i++) {
          const imagename = i.toString();
          characterimages[character][subfolder][i] = new Image();
          characterimages[character][subfolder][i].onload = () => {
            //console.log(`Loaded image ${imagename} for character ${character} in ${subfolder}`);
            numLoaded++;
            if (numLoaded === numImages) {
              setGlobal('characters', characterimages);
              resolve();
            }
          };
          characterimages[character][subfolder][i].onerror = () => {
            //console.log(`Error loading image ${imagename} for character ${character} in ${subfolder}`);
            numLoaded++;
            if (numLoaded === numImages) {
              setGlobal('characters', characterimages);
              resolve();
            }
          };
          characterimages[character][subfolder][i].src = `../characters/${character}/${subfolder}/${imagename}.gif`;
        }
      });
    });
  });
}
