function displayTemperature(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let conditionDescription = document.querySelector("#description");
  conditionDescription.innerHTML = response.data.weather[0].description;
  console.log(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let cityName = "Bogota";
let apiKey = "9798d0efdc49b9137ba9478ff4af211b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
