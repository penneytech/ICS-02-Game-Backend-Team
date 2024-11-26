import { getGlobal, setGlobal } from "../globals.js";

export function timer() {

  setInterval(function () {

    let timeleft = getGlobal("timeleft");
    timeleft -= 1000;
    setGlobal("timeleft", timeleft);
    console.log("timeleft", timeleft);
  }, 1000);

}