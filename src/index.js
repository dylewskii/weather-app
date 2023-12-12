/* eslint-disable no-param-reassign */
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
    const forecastWeatherApi = `https://api.weatherapi.com/v1/forecast.json?key=11111111&q=${city}&aqi=yes`;
    const forecastWeatherResponse = await fetch(forecastWeatherApi, {mode: "cors"});
    const forecastWeatherData = await forecastWeatherResponse.json();
    console.log(forecastWeatherData)

    return forecastWeatherData;
}

const saveWeatherData = async (city) => {
    await getWeatherData(city)
        .then((data) => {
            console.log(data)
            weatherInfo.location = [data.location.name, data.location.region];
            weatherInfo.description = data.current.condition.text;
            weatherInfo.temperature = data.current.temp_c;
            weatherInfo.airQuality = data.current.air_quality["us-epa-index"];
            weatherInfo.pressure = data.current.pressure_mb;
            weatherInfo.uv = data.current.uv;
            weatherInfo.precipitation = data.current.precip_mm;
            weatherInfo.wind = data.current.wind_kph;
            weatherInfo.visibility = data.current.vis_km;
            weatherInfo.sunrise = data.forecast.forecastday[0].astro.sunrise;
            weatherInfo.sunset = data.forecast.forecastday[0].astro.sunset;
        })
        .catch((err) => {
            console.log("Error Retrieving Weather Data", err);
        }
    )
}

const renderData = () => {
    const fields = [description, temperature, uv, airQuality, pressure, visibility, precipitation, wind, sunrise, sunset];
    fields.forEach((field) => {
        const fieldName = field.id;
        const weatherInfoValue = weatherInfo[fieldName];

        if (weatherInfoValue === null || weatherInfoValue === undefined){
            field.textContent = "-";
        } else {
            field.textContent = weatherInfoValue;
        }   
    })
}

searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value)
        .then(() => renderData());
})