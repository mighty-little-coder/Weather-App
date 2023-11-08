//Universally declared variables
var searchDest = document.querySelector("#locationTextBox");
var searchSubmit = document.querySelector("#locationSearch");
var locations = document.querySelector(".locationEl")
var setToday = document.querySelector(".todaysDate");
var pastDest = document.querySelector(".prevList");
var destinationsArray = []
var displayToday = document.querySelector(".today")

var getPastDest = localStorage.getItem("dest")
if(getPastDest) {
  destinationsArray = JSON.parse(getPastDest);
  destinationsArray.forEach(element => {
    renderPrevDest(element);
  });
}

// Set time for current day section
function displayTime() {
  var currentTime = dayjs().format('dddd MMM DD, YYYY');
  setToday.textContent = currentTime;
}

displayTime();
setInterval(displayTime, 1000);

// Storing previously searched destinations in local storage
function storeDest(dest) {
  if(destinationsArray.includes(dest)) return;
  destinationsArray.push(dest);
  localStorage.setItem("dest", JSON.stringify(destinationsArray));
  renderPrevDest(dest);
  // console.log();localStorage
};


// Renders current day info on page
function renderCurrentDest(currentWeatherData) {

  
  // Console logging current day info to verify inputs
  console.log(currentWeatherData);
  
  
  // Code to display current day icons and text
  document.querySelector(".cityName").innerHTML = currentWeatherData.city.name;
  document.querySelector("#todayTemp").innerHTML = "Temperature: " + currentWeatherData.list[0].main.temp + "°F";
  document.querySelector("#todayWind").innerHTML = "Wind Speed: " + currentWeatherData.list[0].wind.speed + "mph";
  document.querySelector("#todayHumid").innerHTML = "Humidity: " + currentWeatherData.list[0].main.humidity + "%";
};

// Renders forecasted info on page
function renderDestForecast(currentWeatherData) {
  
  //Input to add one day at a time to each forecast card
  var forecastDateEl = dayjs();
  var forecastDate1 = forecastDateEl.add(1, 'day');
  var forecastDate2 = forecastDateEl.add(2, 'day');
  var forecastDate3 = forecastDateEl.add(3, 'day');
  var forecastDate4 = forecastDateEl.add(4, 'day');
  var forecastDate5 = forecastDateEl.add(5, 'day');
  
  //Day 1
  document.querySelector("#date1").innerHTML = forecastDate1.format('dddd MMM DD');
  document.querySelector("#forecastTemp1").innerHTML = "Temp: " + currentWeatherData.list[7].main.temp + "°F";
  document.querySelector("#forecastWind1").innerHTML = "Wind Speed: " + currentWeatherData.list[7].wind.speed + "mph";
  document.querySelector("#forecastHumid1").innerHTML = "Humidity: " + currentWeatherData.list[7].main.humidity + "%";
  
  //Day 2
  document.querySelector("#date2").innerHTML = forecastDate2.format('dddd MMM DD');
  document.querySelector("#forecastTemp2").innerHTML = "Temp: " + currentWeatherData.list[15].main.temp + "°F";
  document.querySelector("#forecastWind2").innerHTML = "Wind Speed: " + currentWeatherData.list[15].wind.speed + "mph";
  document.querySelector("#forecastHumid2").innerHTML = "Humidity: " + currentWeatherData.list[15].main.humidity + "%";
  
  //Day 3
  document.querySelector("#date3").innerHTML = forecastDate3.format('dddd MMM DD');
  document.querySelector("#forecastTemp3").innerHTML = "Temp: " + currentWeatherData.list[23].main.temp + "°F";
  document.querySelector("#forecastWind3").innerHTML = "Wind Speed: " + currentWeatherData.list[23].wind.speed + "mph";
  document.querySelector("#forecastHumid3").innerHTML = "Humidity: " + currentWeatherData.list[23].main.humidity + "%";
  
  //Day 4
  document.querySelector("#date4").innerHTML = forecastDate4.format('dddd MMM DD');
  document.querySelector("#forecastTemp4").innerHTML = "Temp: " + currentWeatherData.list[31].main.temp + "°F";
  document.querySelector("#forecastWind4").innerHTML = "Wind Speed: " + currentWeatherData.list[31].wind.speed + "mph";
  document.querySelector("#forecastHumid4").innerHTML = "Humidity: " + currentWeatherData.list[31].main.humidity + "%";
  
  //Day 5
  document.querySelector("#date5").innerHTML = forecastDate5.format('dddd MMM DD');
  document.querySelector("#forecastTemp5").innerHTML = "Temp: " + currentWeatherData.list[39].main.temp + "°F";
  document.querySelector("#forecastWind5").innerHTML = "Wind Speed: " + currentWeatherData.list[39].wind.speed + "mph";
  document.querySelector("#forecastHumid5").innerHTML = "Humidity: " + currentWeatherData.list[39].main.humidity + "%";
}

function renderPrevDest(dest) {
  var li = document.createElement("button");
  li.textContent = dest;
  li.addEventListener("click", function() {
      getWeather(dest);
      document.querySelector(".weatherContainer").style.display = "block";
  
      // })
    });
    pastDest.appendChild(li);
  }
  
  
  
  // Submit event function (runs on submit, not just on click event)
  locations.addEventListener("submit", function (event) {
    event.preventDefault();
       
    var city = searchDest.value;
    
    getWeather(city);
    
  });
  
  function getWeather(city) {
    var APIKey = "3ac4c533f75c393e9ad9feff434508cf";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
    
    
    
    fetch(queryURL).then(function (response) {
      console.log(response);
      if (response.ok) {
        storeDest(city) 
        document.querySelector(".weatherContainer").style.display = "block";
      } else {
        document.querySelector(".weatherContainer").style.display = "none";
      };
    return response.json();
  })
  .then(function (weatherData) {
    renderCurrentDest(weatherData);
    renderDestForecast(weatherData);
    
  })
  
};
  