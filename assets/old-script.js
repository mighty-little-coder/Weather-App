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
