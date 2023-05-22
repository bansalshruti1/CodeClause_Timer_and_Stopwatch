const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0]; 
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];
var audio = document.getElementById('audio');
//var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;
function playPause(){
 if(count == 0){
    count = 1;
    audio.play();
    playButton.innerHTML = 'Pause';
 }
 else{
    count = 0;
    audio.pause();
    playButton.innerHTML = 'Play';
 }
}
 function reset1(){
     playPause();
     audio.pause();
  audio.currentTime = 0;
  playButton.innerHTML = 'Play';
 }
let isPlay = false;
let setCounter = 0;
let min;
let sec;
let centiSec;
let centiCounter = 0;
let minCounter = 0;
let lapitem = 0;
let isReset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden")
    resetButton.classList.remove("hidden")
}

const play = () => {
    if (!isPlay && !isReset){
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
       min = setInterval(() => {
        if(minCounter === 60){
            minCounter = 0;
        }
                minute.innerHTML = `${++minCounter} :` ;
           }, 60*1000);
        sec = setInterval(() => {
       
            if(setCounter === 60){
            setCounter = 0;
        }
            second.innerHTML = `&nbsp;${++setCounter} :  ` ;
       }, 1000);
       centiSec = setInterval(() => {
        if(centiCounter === 100){
            centiCounter = 0;
        }
        centiSecond.innerHTML = `&nbsp;${++centiCounter}` ;
   }, 10);
        isPlay = true;
        isReset = true;
    }else{
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
}


const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    second.innerHTML = '&nbsp;0 :'
    centiSecond.innerHTML = '&nbsp;0';
    minute.innerHTML = '0 :';
}   

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class","lap-item");
    number.setAttribute("class","number");
    timeStamp.setAttribute("class","time-stamp");

    number.innertext = `#${++lapitem}`;
    timeStamp.innerHTML = `${minCounter} : ${setCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);
    clearButton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);

    clearButton.classList.add("hidden");
    lapitem=0;
}
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
lapButton.addEventListener("click",lap);
clearButton.addEventListener("click",clearAll);