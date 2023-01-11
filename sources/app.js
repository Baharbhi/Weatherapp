function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

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

  let month = months[date.getMonth()];
  let today = date.getDate();
  let year = date.getFullYear();

  return `${hours}:${minute} <br> ${day} <br> ${month} ${today} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   
     <div class="col">
       <div class="card h-100">
         <div class="card-body">
           <span class="card-title">${Math.round(
             forecastDay.temperature.maximum
           )}°</span>
           <span class="card-title-max">${Math.round(
             forecastDay.temperature.minimum
           )}°</span>
           <p class="card-text"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
             forecastDay.condition.icon
           }.png" width=52></p>
         </div>
         <div class="card-footer">
           <small class="text-muted">${formatDay(forecastDay.time)}</small>
         </div>
       </div>
     </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f97cbea0f5e987ebb494t7fe128o5431";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayUnit(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temp");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let cityElemet = document.querySelector("#city");
  let descripntionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  celisius = response.data.temperature.current;
  tempElement.innerHTML = Math.round(celisius);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}m/h`;
  cityElemet.innerHTML = response.data.city;
  descripntionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "f97cbea0f5e987ebb494t7fe128o5431";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayUnit);
}

function submitCity(event) {
  event.preventDefault();
  let cityNameElement = document.querySelector("#search-form");
  search(cityNameElement.value);
}

let searchElement = document.querySelector("#search-city");
searchElement.addEventListener("click", submitCity);

function displayUnitOfCurrentPosition(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  let wind = response.data.wind.speed;
  let windInput = document.querySelector("#wind");
  let currentCity = document.querySelector("#city");
  let descripntionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  temp.innerHTML = `${temperature}`;
  hum.innerHTML = `${humidity} %`;
  windInput.innerHTML = `${wind} m/h`;
  currentCity.innerHTML = `${response.data.name}`;
  descripntionElement.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function currentLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayUnitOfCurrentPosition);
}
function geoLoc() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentElement = document.querySelector("#location");
currentElement.addEventListener("click", geoLoc);

search("New york");
