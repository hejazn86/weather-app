//current date
function returnDate(timestamp) {
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

function displayForecast(response) {
    let date = new Date(response.data.daily[0].dt * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Sat"];
    let day = days[date.getDay()];
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = `<div class="row">
                            <div class="col-2">
                                <div>${day}</div>
                                <div>
                                    <img alt="" src="https://openweathermap.org/img/wn/${
                                      response.data.daily[0].weather[0].icon
                                    }@2x.png" id="icon" width="60" />
                                </div>
                                <div><span>${Math.round(
                                  response.data.daily[0].temp.max
                                )}° </span><span> ${Math.round(
    response.data.daily[0].temp.min
  )}° </span></div>
                            </div>
                        </div>`;
}

function displayWeather(response) {
    let lon = response.data.coord.lon;
    let lat = response.data.coord.lat;
    let cityElement = document.querySelector("#city");
    let temp = document.querySelector("#temp");
    celsiusTemp = response.data.main.temp;
    let humidity = document.querySelector("#humidity");
    let pressure = document.querySelector("#pressure");
    let wind = document.querySelector("#wind");
    let state = document.querySelector("#description");
    let icon = document.querySelector("#icon");
    let dateElement = document.querySelector("#date");
    let apiKey = "23e3d9bae4132013c667d9e2b2889760";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    cityElement.innerHTML = response.data.name;
    temp.innerHTML = `${Math.round(celsiusTemp)}`;
    humidity.innerHTML = `% ${response.data.main.humidity}`;
    pressure.innerHTML = response.data.main.pressure;
    wind.innerHTML = response.data.wind.speed;
    state.innerHTML = response.data.weather[0].description;
    dateElement.innerHTML = returnDate(response.data.dt * 1000);
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", `${response.data.weather[0].description}`);
    axios.get(apiUrl).then(displayForecast);
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