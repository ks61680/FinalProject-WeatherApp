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

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°F`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearch);

function search(city) {
  let apiKey = `6cbb4d27cc97b6552f879a3445ccd1f5`;
  let units = `imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let feelsLikeElement = document.querySelector("#feels-like");
  let celsiusFeelsLike = ((feelsLike - 32) * 5) / 9;
  feelsLikeElement.innerHTML = `${Math.round(celsiusFeelsLike)}°C`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°F`;
}

let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("New York");
