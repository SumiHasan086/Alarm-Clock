const currentTime = document.querySelector('h1');
const content = document.querySelector('.content');
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false;
let ringtone = new Audio('./ringtone.mp3');

for(let i = 12; i > 0; i--){
    i = i <10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend" , option);
}
for(let i = 59; i >= 0; i--){
    i = i <10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend" , option);
}
for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend" , option);
}

setInterval(()=>{
   //    getting hours min sec
   let date = new Date();
   hr = date.getHours(),
   mi = date.getMinutes(),
   se = date.getSeconds(),
   ampm = "AM";

   if(hr >= 12) {
    hr = hr - 12;
    ampm = "PM";
   }

   //    if hour value is 0 , set this value to 12
   hr = hr == 0 ? hr = 12 : hr;

   //adding 0 before hour,min,sec if this value is less than 10
    hr = hr <10 ? "0" + hr : hr;
    mi = mi < 10 ? "0" + mi : mi;
    se = se < 10 ? "0" + se : se;

    currentTime.innerText = `${hr} : ${mi} : ${se} ${ampm}`;

    if(alarmTime == `${hr}:${mi} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
    }
  
},1000)

function setAlarm(){
    if(isAlarmSet) {//if isAlarmSet is true
        alarmTime = '';//clear the value of alarmTime
        ringtone.pause();//pause the ringtone
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false; //return isAlarmSet value from  true to false
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please, select a valid time to set Alarm!")
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click",setAlarm)





























