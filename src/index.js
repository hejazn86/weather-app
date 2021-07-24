//current date
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Satuarday",
];
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    " August",
    "September",
    "October",
    "November",
    "December",
];

let now = new Date();
let today = document.querySelector("#today");
today.innerHTML = `${days[now.getDay()]}`;
let date = document.querySelector("#date");
date.innerHTML = `${now.getDate()} ${
  months[now.getMonth()]
} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

//cities' weather info
function displayWeather(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let temp = document.querySelector("#temp");
    let temperature = Math.round(response.data.main.temp);
    temp.innerHTML = `${temperature}`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `% ${response.data.main.humidity}`;
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = response.data.main.pressure;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;
    let state = document.querySelector("#description");
    state.innerHTML = response.data.weather[0].main;
}

function getInformation(event) {
    event.preventDefault();
    let apiKey = "23e3d9bae4132013c667d9e2b2889760";
    let cityName = document.querySelector("#inputCity").value;
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

    axios
        .get(`${apiUrl}${cityName}&units=metric&appid=${apiKey}`)
        .then(displayWeather);
}

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", getInformation);

//current location weather info
function displayPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "23e3d9bae4132013c667d9e2b2889760";
    let locUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(locUrl).then(displayWeather);
}

function currentLocationWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayPosition);
}

let current_loc = document.querySelector("#current-loc");
current_loc.addEventListener("click", currentLocationWeather);