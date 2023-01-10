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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   
     <div class="col">
       <div class="card h-100">
         <div class="card-body">
           <h5 class="card-title">10°C</h5>
           <p class="card-text">🌥️</p>
         </div>
         <div class="card-footer">
           <small class="text-muted">${day}</small>
         </div>
       </div>
     </div>`;
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
  let descripntionElement = document.querySelector("#descripntion");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
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
  let cityNameElement = document.querySelector("#exampleDataList");
  search(cityNameElement.value);
}
function showFahrTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrTemp);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  fahrLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let searchElement = document.querySelector("#clickMe");
searchElement.addEventListener("click", submitCity);

let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", showFahrTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp);

search("Mashhad");
