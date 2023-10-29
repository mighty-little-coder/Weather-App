// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
var dateIs = dayjs();
var searchDest = document.querySelector("#locationTextBox");
var setToday = document.querySelector("todaysDate");
var searchSubmit = document.querySelector("#locationSearch");
var pastDest = document.querySelector("#prevListLi");


function today() {
  setToday.dateIs;
}

function searchBtn() {
  searchSubmit.addEventListener("submit", setDest);
}

document.querySelector('form').onsubmit = function (e) {
  e.preventDefault();
  var dest = searchDest.value;
  localStorage.setItem("destination", JSON.stringify(dest));
  console.log(localStorage);
  searchDest.value = "";
  var previousDest = JSON.parse(localStorage.getItem("destination"));
  var ul = document.querySelector("prevList");
  previousDest.forEach(function(item) {
    var prevDestEl = document.createElement("listItem");
    listItem.appendChild(document.createTextNode(item));
    prevList.appendChild(listItem);
  });
}