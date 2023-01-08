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

function displayUnit(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temp");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let cityElemet = document.querySelector("#city");
  let descripntionElement = document.querySelector("#descripntion");
  let timeElement = document.querySelector("#time");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  cityElemet.innerHTML = response.data.name;
  descripntionElement.innerHTML = response.data.weather[0].description;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "959f5f0ba0ac8dfc4839304323276dfa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=mashhad&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayUnit);
