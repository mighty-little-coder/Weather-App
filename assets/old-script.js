// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var searchDest = document.querySelector("#locationTextBox");
var searchSubmit = document.querySelector("#locationSearch");
var locations = document.querySelector(".locationEl")
var setToday = document.querySelector(".todaysDate");
var pastDest = document.querySelector(".prevList");
var destinationsArray = []
var displayToday = document.querySelector(".today")

// displayToday.innerHTML = "";

function displayTime() {
  var currentTime = dayjs().format('dddd MMM DD, YYYY');
  setToday.textContent = currentTime;
}

displayTime();
setInterval(displayTime, 1000);

function storeDest(dest) {
  localStorage.setItem("destination", dest);
  // console.log(dest);
  // console.log(localStorage);
}

function renderPrevDest() {
  pastDest.innerHTML = "";
  
  for (var i = 0; i < destinationsArray.length; i++) {
    var prevDestEl = destinationsArray[i];
    
    var li = document.createElement("li");
    li.textContent = pastDest;
    li.setAttribute("data-index", i);
    
    var listBtn = document.createElement("button");
    listBtn.textContent = "Search";
    
    li.appendChild(listBtn);
    pastDest.appendChild(li);
  }
}

function renderCurrentDest(currentWeatherData) {
  console.log("Happening in renderCurrentDest");

  // Console logging current day info to verify inputs
  console.log(currentWeatherData.list[0].dt);
  console.log(currentWeatherData);
  

  // Code to display current day icons and text
document.querySelector(".cityName").innerHTML = currentWeatherData.city.name;
document.querySelector("#todayTemp").innerHTML = "Temperature: " + currentWeatherData.list[0].main.temp + "°F";
document.querySelector("#todayWind").innerHTML = "Wind Speed: " + currentWeatherData.list[0].wind.speed + "mph";
document.querySelector("#todayHumid").innerHTML = "Humidity: " + currentWeatherData.list[0].main.humidity + "%";
  
  
  
}

locations.addEventListener("submit", function (event) {
  event.preventDefault();
  
  console.log("Submitted")
  
  var city = searchDest.value;
  storeDest(city);
  
  var APIKey = "3ac4c533f75c393e9ad9feff434508cf";
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
  
  fetch(queryURL).then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(weatherData) {
    renderCurrentDest(weatherData);

  })
  
});
