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
let today = document.querySelector("#day");
day.innerHTML = `${days[now.getDay()]}`;
let date = document.querySelector("#date");
date.innerHTML = `${now.getDate()} ${
  months[now.getMonth()]
} ${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

//cities' weather info
function displayWeather(response) {
    let cityElement = document.querySelector("#city");
    let temp = document.querySelector("#temp");
    let humidity = document.querySelector("#humidity");
    let pressure = document.querySelector("#pressure");
    let wind = document.querySelector("#wind");
    let state = document.querySelector("#description");
    let icon = document.querySelector("#icon");

    cityElement.innerHTML = response.data.name;
    temp.innerHTML = `${Math.round(response.data.main.temp)}`;
    humidity.innerHTML = `% ${response.data.main.humidity}`;
    pressure.innerHTML = response.data.main.pressure;
    wind.innerHTML = response.data.wind.speed;
    state.innerHTML = response.data.weather[0].description;
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search(city) {
    let apiKey = "23e3d9bae4132013c667d9e2b2889760";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
}

function getInformation(event) {
    event.preventDefault();
    let cityName = document.querySelector("#inputCity");
    search(cityName.value);
}

search("Ahvaz");

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", getInformation);