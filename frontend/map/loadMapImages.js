import { setGlobal } from "../globals.js";

let images = [];

export function loadMapImages() {
    
  return new Promise((resolve) => {
    console.log("LOADING MAP IMAGES");
      
    const imagenames = [
      3, 10, 11, 40, 41, 42, 50, 56, 60, 69, 75, 78, 79, 86, 91, 92, 103, 139, 169,
      201, 233, 357, 519, 520, 550, 551, 552, 553, 583, 584, 1610612739, 1610612887,
      1610613093, 2147483689, 2147483704, 2147483733, 2147484005, 2684354563,
      2684354968, 2684355000, 3221225483,
    ];

    let numLoaded = 0;
    let numImages = imagenames.length;
      
    imagenames.forEach((imagename, index) => {
      images[imagename] = new Image();
      images[imagename].onload = () => {
       // console.log(`Loaded image ${imagename}`);
        numLoaded++;
        if (numLoaded === numImages) {
          setGlobal('mapimages', images);
          resolve();
        }
      };
      images[imagename].onerror = () => {
        //console.log(`Error loading image ${imagename}`);
        numLoaded++;
        if (numLoaded === numImages) {
          setGlobal('mapimages', images);
          resolve();
        }
      };
      images[imagename].src = `../map/assets/${imagename}.png`;
    });
  });

    // Set images array
    setGlobal('mapimages', images)
}
