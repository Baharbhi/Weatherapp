let now = new Date();

let time = document.querySelector("#time-input");

function timeFormat(now) {
  let currenthour = now.getHours();

  if (currenthour < 10) {
    currenthour = `0${currenthour}`;
  }
  let currentmin = now.getMinutes();
  if (currentmin < 10) {
    currentmin = `0${currentmin}`;
  }
  return `${currenthour}:${currentmin}`;
}
time.innerHTML = timeFormat(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let weekDay = document.querySelector("#week-day");
weekDay.innerHTML = `${day}`;

let today = document.querySelector("#date-input");
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let currentDate = now.getDate();
let currentYear = now.getFullYear();
today.innerHTML = `${month} ${currentDate} ${currentYear}`;

function showCity(response) {
  let city = document.querySelector("#exampleDataList");
  let cityName = document.querySelector("#city-input");
  response.preventDefault();
  cityName.innerHTML = `${city.value}`;
  let apiKey = "959f5f0ba0ac8dfc4839304323276dfa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeUnit);
}

function changeUnit(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp-input");
  temp.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#hum-input");
  hum.innerHTML = `${humidity} %`;
  let wind = response.data.wind.speed;
  let windInput = document.querySelector("#wind-input");
  windInput.innerHTML = `${wind} km/h`;
  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = `${response.data.name}`;
}

function showWeather(position) {
  let apiKey = "959f5f0ba0ac8dfc4839304323276dfa";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeUnit);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showWeather);
}
let currentWeather = document.querySelector("#current-weather");
currentWeather.addEventListener("click", geolocation);
navigator.geolocation.getCurrentPosition(showWeather);

let searchIcon = document.querySelector("#clickMe");
searchIcon.addEventListener("click", showCity);

//function changeunitb(event) {
//  event.preventDefault();
//  tempDegree.innerHTML = Math.round(((43 - 32) * 5) / 9);
//}
//let celsius = document.querySelector("#cel-input");
//let fahrenheit = document.querySelector("#far-input");
//celsius.addEventListener("click", changeunitb);
//fahrenheit.addEventListener("click", changeunit);
//let tempDegree = document.querySelector("#temp-input");
