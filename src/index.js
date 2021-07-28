//current date
function returnData(timestamp) {
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Satuarday",
    ];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }

    return `${day}  ${hours}:${minutes}`;
}

//cities' weather info
function displayWeather(response) {
    let cityElement = document.querySelector("#city");
    let temp = document.querySelector("#temp");
    celsiusTemp = response.data.main.temp;
    let humidity = document.querySelector("#humidity");
    let pressure = document.querySelector("#pressure");
    let wind = document.querySelector("#wind");
    let state = document.querySelector("#description");
    let icon = document.querySelector("#icon");
    let dateElement = document.querySelector("#date");

    cityElement.innerHTML = response.data.name;
    temp.innerHTML = `${Math.round(celsiusTemp)}`;
    humidity.innerHTML = `% ${response.data.main.humidity}`;
    pressure.innerHTML = response.data.main.pressure;
    wind.innerHTML = response.data.wind.speed;
    state.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = returnData(response.data.dt * 1000);
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

function convertToFahrenheit(event) {
    event.preventDefault();
    celsiusProperty.classList.remove("active");
    fahrenheitProperty.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
    event.preventDefault();
    fahrenheitProperty.classList.remove("active");
    celsiusProperty.classList.add("active");
    let temp = document.querySelector("#temp");
    temp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", getInformation);

let fahrenheitProperty = document.querySelector("#f-degree");
fahrenheitProperty.addEventListener("click", convertToFahrenheit);

let celsiusProperty = document.querySelector("#c-degree");
celsiusProperty.addEventListener("click", convertToCelsius);

search("Ahvaz");