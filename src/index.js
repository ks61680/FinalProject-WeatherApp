function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = (time.getHours() < 10 ? `0` : ``) + time.getHours();
  let minutes = (time.getMinutes() < 10 ? `0` : ``) + time.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let year = date.getFullYear();
  return `Today is ${month} ${dayNumber}, ${year}`;
}

function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = (time.getHours() < 10 ? `0` : ``) + time.getHours();
  let minutes = (time.getMinutes() < 10 ? `0` : ``) + time.getMinutes();
  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let currentCity = document.querySelector("#city");
  let currentDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;
  feelsLike = response.data.main.feels_like;
  windSpeed = response.data.wind.speed;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} MPH`;
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearch);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement = "";
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2"> 
    <h4>${formatHours(forecast.dt * 1000)}</h4>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" class= "smallImage" alt="" />
            <div class="forcastTemp"><strong>${Math.round(
              forecast.main.temp_max
            )}</strong>|${Math.round(forecast.main.temp_min)}
            </div>
          </div>`;
  }
}

function search(city) {
  let apiKey = `6cbb4d27cc97b6552f879a3445ccd1f5`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#main-temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let feelsLikeElement = document.querySelector("#feels-like");
  let celsiusFeelsLike = ((feelsLike - 32) * 5) / 9;
  let windElement = document.querySelector("#wind");
  let kilometerWindSpeed = Math.round(windSpeed * 1.609);

  feelsLikeElement.innerHTML = `${Math.round(celsiusFeelsLike)}°C`;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  windElement.innerHTML = `${Math.round(kilometerWindSpeed)} KM/H`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");

  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°F`;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  windElement.innerHTML = `${Math.round(windSpeed)} MPH`;
}

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

function retrievePosition(position) {
  let apiKey = `6cbb4d27cc97b6552f879a3445ccd1f5`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = `imperial`;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrent).then(showPosition);
}

function showPosition(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let currentCity = document.querySelector("h1");
  let currentDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;
  feelsLike = response.data.main.feels_like;
  windSpeed = response.data.wind.speed;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} MPH`;
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentPosition);

getCurrentPosition();
