// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var dateIs = dayjs();
var searchDest = document.querySelector("#locationTextBox")
var setToday = document.querySelector("todaysDate")
var searchSubmit = document.querySelector("#locationSearch")


function today() {
setToday = dateIs;
}

function setDest(event) {
  event.preventdefault();
  searchDest.value = "";
}

function searchBtn() {
 searchSubmit.addEventListener("submit", setDest);
}