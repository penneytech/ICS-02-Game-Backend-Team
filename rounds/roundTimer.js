let timeremaining = 10000;
let paused = false;

let globals = require('../globals.js');

function startTimer() {

    setInterval(function() {
        let io = globals.getGlobal('io');

        if (timeremaining == 0 && paused == false) {
            paused = true; // We're paused
            timeremaining = 10000;
            console.log("PAUSED")
            io.emit("timerpaused", paused); // Paused frontend
        }

        if (timeremaining == 0 && paused == true) {
            paused = false; // We're playing
            timeremaining = 300000;
            console.log("PLAYING");
            io.emit("timerpaused", paused); // Paused frontend
        }

        timeremaining = timeremaining - 1000;
        globals.setGlobal('timeleft', timeremaining);
        // console.log(timeremaining);
    }, 1000);
}

startTimer();
