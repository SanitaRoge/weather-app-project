function displayTemperature(response) {
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let conditionDescription = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  cityName.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  conditionDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

let cityName = "Bogota";
let apiKey = "9798d0efdc49b9137ba9478ff4af211b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
