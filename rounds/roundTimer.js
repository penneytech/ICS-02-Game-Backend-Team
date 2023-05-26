let timeremaining = 10000;
let paused = false;

let globals = require('../globals.js');

function startTimer() {

    setInterval(function () {
        let io = globals.getGlobal('io');

        try {

            if (timeremaining == 0 && paused == false) {
                paused = true; // We're paused
                timeremaining = 10000;
                console.log("PAUSED")
                io.emit("betweenrounds", true); // Paused frontend
            }

            if (timeremaining == 0 && paused == true) {
                paused = false; // We're playing
                timeremaining = 120000;
                console.log("PLAYING");
                io.emit("betweenrounds", false); // Paused frontend
            }
        } catch (error) {
            console.log(error);
        }

        timeremaining = timeremaining - 1000;
        globals.setGlobal('timeleft', timeremaining);
        // console.log(timeremaining);
    }, 1000);
    
}

startTimer();
