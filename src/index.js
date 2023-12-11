import "./styles.css";
// eslint-disable-next-line no-unused-vars
import search from "./assets/icons/search.png";

// Search
const searchBox = document.getElementById("search");
const searchBtn = document.querySelector(".search-btn");
// Weather Fields
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const airQuality = document.getElementById("air-quality");
const pressure = document.getElementById("pressure");
const uv = document.getElementById("uv");
const precipitation = document.getElementById("precipitation");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherInfo = {
    location: [],
    description: null,
    temperature : null,
    airQuality : null,
    pressure: null,
    uv : null,
    precipitation : null,
    wind : null,
    visibility : null,
    sunrise : null,
    sunset : null
};

const getWeatherData = async (city) => {
    const api = `https://api.weatherapi.com/v1/current.json?key=d04037fa261e40e39e0142607230612&q=${city}`;
    const response = await fetch(api, {mode: "cors"});
    const data = await response.json();

    return data;
}

const saveWeatherData = async (city) => {
    await getWeatherData(city)
        .then((data) => {
            console.log(data)
            weatherInfo.location = [data.location.name, data.location.region];
            weatherInfo.description = data.current.condition.text;
            weatherInfo.temperature = data.current.temp_c;
            weatherInfo.airQuality = null;
            weatherInfo.pressure = data.current.pressure_mb;
            weatherInfo.uv = data.current.uv;
            weatherInfo.precipitation = data.current.precip_mm;
            weatherInfo.wind = data.current.wind_kph;
            weatherInfo.visibility = data.current.wind_kph;
            weatherInfo.sunrise = null;
            weatherInfo.sunset = null;
        })
        .catch((err) => {
            console.log("Error Retrieving Weather Data", err);
        }
    )
}

const renderData = () => {
    const fields = [description, temperature, airQuality, pressure, uv, precipitation, wind, visibility, sunrise, sunset];
    fields.forEach((field) => {
        const fieldName = field.id;
        const weatherInfoValue = weatherInfo[fieldName];

        if (!weatherInfoValue){
            field.textContent = "N/A"
        } else {
            field.textContent = weatherInfoValue;
        }   
    })
}

searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value).then(
        () => renderData());
})