/*
 * cpBootcamp: Pomodoro Timer
 * Robin Littlefield 
 *
 * index.js: 
 * v1.0 2/25/21
 * v2.0 2/28/21
 */

class Timer {
    constructor() {
        this.type = "pomodoro";
        this.circle = document.querySelector("#ring > circle");
        this.clock = document.getElementById("time");
        this.actionElement = document.getElementById("action");
        this.timer = 5; /* XX change to 5 for now, change back to 25 */
        this.text = this.timer <= 9 ? "0" + this.timer : this.timer;
    }

    select() {
        // get type  (pomodoro, short break, or long break)
        // set timer (25, 5, long break is 15-30,minutes)
        // call reset()
    }
    settings() {
        // this is for the settings box
    }

    reset() {
        this.stop();
        this.timer = 25; // set back to the default value.
        this.text = this.timer <= 9 ? "0" + this.timer : this.timer;
        this.actionElement.innerText = "start";
         // text reset
        this.clock.innerText = this.text + ":00";
        this.circle.style.strokeDashoffset = 1024; /* hardcoded */
    }
    start() {
        function format(timeFormat) {
                return timeFormat < 10 ? '0' + timeFormat : timeFormat;
            }
        // change clock text
        this.clock.innerText = `${this.text}:00`;
        this.circle.style.strokeDashoffset = 1024; /* ADDED in class */
        
        let time = this.timer * 60; // change from milliseconds to seconds
        let startTime = time;
        let minutes = 0;
        let seconds = 0;
        time--; // added this to fix the 1 second delay

        this.interval = setInterval( () => {
            minutes = Math.floor(time / 60); 
            seconds = Math.floor(time % 60); 

            let minutesText = format(minutes);
            let secondsText = format(seconds);

            this.clock.innerText = minutesText + ":" + secondsText;

            const percent = (time % startTime) / startTime;
            const offset = percent * 1024;
            this.circle.style.strokeDashoffset = offset;

            if (--time < 0) {   // decrement first...
                this.timer = 0; // have to stop the interval.. so clearInterval()
                clearInterval(this.interval);
            }
        }, 1000);
        // action text change  XXX,, can add "pause"
        this.actionElement.innerText = "stop";
    }
    stop() {
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

/* Nav Functions */

const navLinks = document.querySelectorAll("nav > ul > li");
const navBg = document.getElementById("bgindicator");
console.log('NAV: bgindicator:', navBg);
console.log(navLinks);

for (const i in navLinks) {
    navLinks.item(i).addEventListener("click", (ev) => {
        navLinks.forEach((link) => link.classList.remove("active"));
        navBg.style.marginLeft = `calc(calc(100%/3) * ${i})`;
        ev.target.classList.add("active");
    });
}
