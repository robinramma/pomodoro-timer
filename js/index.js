/*
 * cpBootcamp: Pomodoro Timer
 * Robin Littlefield 
 *
 * index.js: 
 * v1.0 2/25/21
 */

class Timer {
    constructor() {
        this.clock = document.getElementById("time");
        this.actionElement = document.getElementById("action");
        this.timer = 25; 
        this.text = this.timer <= 9 ? "0" + this.timer : this.timer;
    }

    reset() {
        this.stop();
        this.timer = 25; // set back to the default value.
        this.text = this.timer <= 9 ? "0" + this.timer : this.timer;
        this.actionElement.innerText = "start";
         // text reset
        this.clock.innerText = this.text + ":00";
    }
    start() {
        function format(timeFormat) {
                return timeFormat < 10 ? '0' + timeFormat : timeFormat;
            }
        // change clock text
        let time = this.timer * 60; // change from milliseconds to seconds
        let minutes = 0;
        let seconds = 0;
        // timer count by 1 second increment
        this.interval = setInterval( () => {
            minutes = Math.floor(time / 60); 
            seconds = Math.floor(time % 60); 

            let minutesText = format(minutes);
            let secondsText = format(seconds);

            this.clock.innerText = minutesText + ":" + secondsText;

            if (--time < 0) {   // decrement first...
                this.timer = 0; // have to stop the interval.... so clearInterval()
                clearInterval(this.interval);
            }
        }, 1000);
        // action text change  XXX,, can add "pause"
        this.actionElement.innerText = "stop";
    }
    stop() {
        // pause the time
        clearInterval(this.interval); // this stops it completely, XX what about pause?
        // reset the action, XX add a PAUSE option, so it can continue.
        this.actionElement.innerText = "start";
    }
}

// ----- TIMER FUNCITONS --------------------

const countdowntimer = new Timer();
countdowntimer.reset();

function action(str) {
    switch (str.toLowerCase()) {
        case "start":  //XX add pause, continue 
            countdowntimer.start();
            break;
        default:
            countdowntimer.stop();
            break;
    }
}




