// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// fetch(queryURL)
var APIkey = "3ac4c533f75c393e9ad9feff434508cf"
var searchDest = document.querySelector("#locationTextBox");
var searchSubmit = document.querySelector("#locationSearch");
var locations = document.querySelector(".locationEl")
var setToday = document.querySelector(".todaysDate");
var pastDest = document.querySelector(".prevList");
var destinationsArray = []
var city;

function displayTime() {
  var currentTime = dayjs().format('dddd MMM DD, YYYY');
  setToday.textContent = currentTime;
}

displayTime();
setInterval(displayTime, 1000);

function storeDest() {
  var dest = searchDest.value;
  localStorage.setItem("destination", JSON.stringify(dest));
  console.log(dest);
  console.log(localStorage);
}

function renderDest() {
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

locations.addEventListener("submit", function (event) {
  event.preventDefault();
  var dest = searchDest.value.trim();

  destinationsArray.push(dest);
  searchDest.value = "";

  storeDest();
  renderDest();

});


function generateWeatherInfo(lat, lon) {
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`;
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIKey}`;
  // Clear existing content in currentInfoDiv and cardsDiv
  currentInfoDiv.textContent = "";
  cardsDiv.textContent = "";
  // Fetch current weather data
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Create elements for current weather info
      const currentCity = document.createElement("h2");
      currentCity.textContent = data.name;
      currentInfoDiv.appendChild(currentCity);
      const currentTemp = document.createElement("h4");
      currentTemp.textContent = "Current Temp: " + Math.round(data.main.temp) + "°";
      currentInfoDiv.appendChild(currentTemp);
      const currentHumidity = document.createElement("h4");
      currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      currentInfoDiv.appendChild(currentHumidity);
      const currentWind = document.createElement("h4");
      currentWind.textContent = "Wind Speed: " + data.wind.speed + "mph";
      currentInfoDiv.appendChild(currentWind);
      const currentPic = document.createElement("img");
      currentPic.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      currentPic.setAttribute("alt", data.weather[0].description);
      currentInfoDiv.appendChild(currentPic);
    })
    .catch(function (err) {
      console.error(err);
      alert("An error occurred while fetching the current weather data.");
    });
  // Fetch 5-day weather forecast
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Initialize a variable to keep track of the current day
      let currentDay = null;
      // Loop through the forecast data
      for (let i = 0; i < data.list.length; i++) {
        const forecastItem = data.list[i];
        const forecastDate = forecastItem.dt_txt.split(" ")[0];
        // Check if it's a new day
        if (forecastDate !== currentDay) {
          // Create a new div for the day
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("weather-day");
          // Create an element for the date
          const dateElement = document.createElement("h3");
          dateElement.textContent = forecastDate;
          dayDiv.appendChild(dateElement);
          // Add other weather information elements (e.g., temperature, humidity, wind) here
          // You can create and append these elements to `dayDiv` here
          var info = document.createElement("div");
          let currentTemp = document.createElement('h4');
          currentTemp.textContent = "Temp: " + Math.round(forecastItem.main.temp) + "°";
          dayDiv.appendChild(currentTemp);
          let currentWind = document.createElement('h4');
          currentWind.textContent = "Wind Speed: " + forecastItem.wind.speed + "mph";
          dayDiv.appendChild(currentWind);
          let currentHumidity = document.createElement('h4');
          currentHumidity.textContent = "Humidity: " + forecastItem.main.humidity + "%";
          dayDiv.appendChild(currentHumidity);
          let imgDiv = document.createElement("div");
          let currentPic = document.createElement("img");
          currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastItem.weather[0].icon + "@2x.png");
          currentPic.setAttribute("alt", forecastItem.weather[0].description);
          imgDiv.appendChild(currentPic);
          dayDiv.appendChild(imgDiv);
          // Append the div for the day's forecast to cardsDiv
          cardsDiv.appendChild(dayDiv);
          // Update the currentDay variable
          currentDay = forecastDate;
        }
      }
    })
    .catch(function (err) {
      console.error(err);
      alert("An error occurred while fetching the forecast data.");
    });
  if (currentInfoDiv.children.length > 0) {
    currentInfoDiv.classList.add('active'); // Add the 'active' class to show the current forecast
  }
}


function getCityCoordinates() {
  var cityName = cSearch.value;
  console.log(cityName + " " + state)
  if (!cityName) return;
  const geoCodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherAPIKey}`;
  fetch(geoCodingApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (!data.length) {
        alert(`No coordinates found for ${cityName}`);
      } else {
        saveCityState(cityName, state);
        const lat = data[0].lat;
        const lon = data[0].lon;
        generateWeatherInfo(lat, lon);
      }
    })
    .catch(function (err) {
      console.error(err);
      alert("An error occurred while fetching the coordinates.");
    });
}

