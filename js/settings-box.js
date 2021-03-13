/*
 * cpBootcamp: Pomodoro Timer 
 * Robin Littlefield
 * 
 * settings-box.js
 * 3/7/21
 */

 class SettingsBox {
    constructor () {
        // this.font = set the font....
        // this.color
    }

   
    changeColor() {
        console.log("settingsBox: changeColor(): ")
    }
 }

function changeFont(newfont) {
    console.log("settingsBox: changeFont() to: ", newfont);
    document.body.style.fontFamily = newfont;
}