//data and temp script
function setDate(){
  window.addEventListener('load',()=>{
    const setDate = document.querySelector(".date");
    let date =  new Date().getDate(),
        month = new Date().getMonth(),
        year =  new Date().getFullYear();
        
      //set date to current value
      setDate.textContent = `${date}.${month+1}.${year}`;
  });
}
function setTemp(){
  let lat;
  let long;
  let appKey = '6830bda0dc29788671e31fa576a532fd';
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
     lat = position.coords.latitude;
     long = position.coords.longitude;
     const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appKey}`;
     //get temperature from 
     async function getWeather(){
      const response = await fetch(api);
      const responseData = await response.json();
      //set the value of the temperature
      const temp = document.querySelector(".temp");
      temp.textContent = responseData.main.temp;
      //create a span element 
      const span = document.createElement('span');
      span.innerHTML = `<span> F </span>`
      temp.appendChild(span);
    }
    getWeather();
    });
    
  }
  
  
}


//to-do script
const Idea = document.querySelector(".idea");
const ul = document.querySelector(".ideas-list");
Idea.addEventListener('keyup',(e)=>{
 let value = e.target.value;
 if(e.keyCode === 13){
   const li = document.createElement('li');
   li.textContent = value;
   ul.appendChild(li);  
   Idea.value = '';
 }
 
});

//main content time and quote of the day
function getTime(){
  let hour =    new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  //tweak hours in suitable way
  hour = hour % 12 || 12; 
  
  //get the time section from dom
  const time = document.querySelector(".time");
  //set the text content
  time.textContent = `${hour}:${minutes}:${seconds}`;
  setTimeout(getTime,1000);

}
function setGreeting(){
  const greeting = document.querySelector(".greeting");
  const today = new Date().getHours();
  if(today < 12){
    greeting.textContent = "Good Morning";
    document.body.style.backgroundColor = '#b590ca';
  
  }else if(today < 18){
    //afternoon
    greeting.textContent = "Good Afternoon";
    document.body.style.backgroundColor = '#d49a89';
  }else{
    //night
    greeting.textContent = "Good Night";
    document.body.style.backgroundColor = '#145374';
  }
}


//Run functions
setDate();
setTemp();
getTime();
setGreeting();