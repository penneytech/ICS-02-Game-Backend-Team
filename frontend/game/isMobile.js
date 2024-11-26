// import { getGlobal } from "../globals.js";

// export function isMobile() {

//     let login = getGlobal("login");
//     // If the inner width of the window is greater then 768px
//     if (window.innerWidth > 600) {
//         // Then log this message to the console
//         //console.log('[isMobile]: Window InnerWidth:', window.innerWidth)
//         //document.getElementById("joy1Div").style.display = 'none';
      
//     } else if (window.innerWidth <= 600 && window.innerWidth > 500 && login) {
//         //console.log('[isMobile]: Window InnerWidth:', window.innerWidth)
//         //document.getElementById("joy1Div").style.display = 'block';
//         return true;
      
//     } else if (window.innerWidth <= 500 && login) {
//         //console.log('[isMobile]: Window InnerWidth:', window.innerWidth)
//         //document.getElementById("joy1Div").style.display = 'block';
//         return true;
//     }
//     return false;
// }

// // Add a listener for when the window resizes
// window.addEventListener('resize', isMobile);