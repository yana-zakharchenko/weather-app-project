let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-date-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°C`;
  let windSpeed = Math.round(response.data.wind.speed)
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${windSpeed}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  console.log(response.data.name);
}

function search(city) {
  let apiKey = "ce48950d7371479b3506a93b3340eea5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `in ${city}`;
  search(city);
}

let form = document.querySelector(".change-city-form");
form.addEventListener("submit", changeCity);

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${temperature}°C`;
  let windSpeed = Math.round(response.data.wind.speed)
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${windSpeed}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  console.log(response.data.name);
  let city = response.data.name;
  let cityElement = document.querySelector("h3");
  cityElement.innerHTML = `in ${city}`;
}

function showPosition(position) {
  let apiKeyLocation = "692d7b16e90a210d4f9d313277587153";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKeyLocation}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", getCurrentPosition);

search("Kyiv");
