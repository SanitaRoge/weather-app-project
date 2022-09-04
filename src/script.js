function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
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
  return `Updated: <br> ${day} <br> ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
    <div class="forecast-date"> ${formatDay(forecastDay.dt)} </div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="image" class="forecast-image"></img>
    <div class="forecast-temperature">
      <span class="forecast-temp-max">${Math.round(
        forecastDay.temp.max
      )}°</span> <br>
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let conditionDescription = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  feelsLikeTemp = Math.round(response.data.main.feels_like);
  celsiusTemperature = Math.round(response.data.main.temp);
  cityName.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  conditionDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function submitSearch(city) {
  let apiKey = "9798d0efdc49b9137ba9478ff4af211b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  submitSearch(cityInput.value);
}
function showCurrentLocation(position) {
  let apiKey = "9798d0efdc49b9137ba9478ff4af211b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(position);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitFeelsLike = (feelsLikeTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(fahrenheitFeelsLike);
}

function convvertCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusFeelsLike = document.querySelector("#feels-like");
  celsiusFeelsLike.innerHTML = Math.round(feelsLikeTemp);
}

let celsiusTemperature = null;
let feelsLikeTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convvertCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

submitSearch("Bogota");
