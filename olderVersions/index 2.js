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
        this.type = 'pomodoro';
        this.circle = document.querySelector("#ring > circle");
        this.clock = document.getElementById('time');
        this.actionElement = document.getElementById('action');
        this.timer = 25; 
        this.text = this.timer <= 9 ? '0' + this.timer : this.timer;
    }

    select() {
        // get type  (pomodoro, short break, or long break)
        // set timer (25, 5, long break is 15-30,minutes)
        // call reset()
    }
    settings() {
        // this is for the settings box
    }

    reset(navType = 'pomodoro') {
        this.stop();
        switch ( navType) {
            case 'short-break':
                this.timer = 5;
                break;
            case 'long-break':
                this.timer = 15;
                break;
            default:
                this.timer = 25;
                break;
        }
        this.text = this.timer <= 9 ? "0" + this.timer : this.timer;
        this.actionElement.innerText = "start";
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
        this.actionElement.innerText = "stop"; //XX add pause option
    }
    stop() {
        clearInterval(this.interval); // this stops it completely, 
        // reset the action, XX add a PAUSE option, so it can continue.
        this.actionElement.innerText = "start";
    }
}

// ----- TIMER button FUNCTIONS in ring -----------

const countdowntimer = new Timer();
countdowntimer.reset('pomodoro'); 

function action(str) {
    switch (str.toLowerCase()) {
        case "start":  //XX add pause, continue 
            countdowntimer.start();
           break;
        case "pause":
            console.log("WANT TO PAUSE IT");
            break;
        default:
            countdowntimer.stop();
            break;
    }
}

// ----- NAV bar FUNCTIONS at top --------

const navLinks = document.querySelectorAll("nav > ul > li");
const navBg = document.getElementById("bgindicator");

for (const i in navLinks) { // foreach of the 3 nav buttons.
    navLinks.item(i).addEventListener("click", (ev) => {  // add listener foreach button.
        navLinks.forEach((link) => link.classList.remove("active")); // make all NOT active.
        navBg.style.marginLeft = `calc(calc(100%/3) * ${i})`;
        ev.target.classList.add("active");
        switch (ev.target.id) {
            case 'navShort':
                countdowntimer.reset('short-break');
                break;
            case 'navLong':
                countdowntimer.reset('long-break');
                break;
            default:
                countdowntimer.reset('pomodoro');
                break;
        }
    });
}

// ----- Settings FORM FUNCTIONS -------------------
// XX add that when click on box, resets to default time

// click on GEAR image
document.querySelector("#settings > img").addEventListener('click', ev => {
    settingscontainer.style.visibility = 'visible';
    settingscontainer.style.opacity = 1;
    console.log("pressed GEAR for settings");
});

// click on input ARROW buttons
document.querySelectorAll(".uparrow, .downarrow").forEach(arrow => {
    arrow.addEventListener('click', (ev) => ev.preventDefault());
});

document.querySelectorAll("#close, #settings-overlay").forEach(el => 
    el.addEventListener('click', () => {
        settingscontainer.style.opacity = 0;
        settingscontainer.style.visiblity = 'hidden';
    })
);

document.querySelector("#settingsApplyButton > button").addEventListener('click', ev => {
    console.log("APPLY BUTTON IS HIT");
    // set the time for pomodoro, short break and long break
});

/**
 * @param {string} input the id of the number input
 * @returns
 * increments / decrements 'input' when clicking the arrow 
 * in index.html: eg. <button class="uparrow" onclick="inc('long-break')">

 */

const inc = (input) => document.getElementById(input).stepUp(1);
const dec = (input) => document.getElementById(input).stepDown(1);
