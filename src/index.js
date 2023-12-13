/* eslint-disable no-param-reassign */
import "./styles.css";
// eslint-disable-next-line no-unused-vars
import search from "./assets/icons/search.png";

// Search
const searchBox = document.getElementById("search");
const searchBtn = document.querySelector(".search-btn");

// 3 Day Forecast Cards
// const dayOneTitle = document.querySelector(".day-one__title");
const dayOneTemp = document.querySelector(".day-one__temp");
const dayOneImg = document.querySelector(".day-one__img");
const dayTwoTitle = document.querySelector(".day-two__title")
const dayTwoTemp = document.querySelector(".day-two__temp");
const dayTwoImg = document.querySelector(".day-two__img");
const dayThreeTitle = document.querySelector(".day-three__title")
const dayThreeTemp = document.querySelector(".day-three__temp");
const dayThreeImg = document.querySelector(".day-three__img");

// Weather Information Fields
const iconField = document.getElementById("icon");
const cityField = document.getElementById("city");
const regionField = document.getElementById("region");
const descriptionField = document.getElementById("description");
const temperatureField = document.getElementById("temperature");
const airQualityField = document.getElementById("air-quality");
const pressureField = document.getElementById("pressure");
const uvField = document.getElementById("uv");
const precipitationField = document.getElementById("precipitation");
const windField = document.getElementById("wind");
const visibilityField = document.getElementById("visibility");
const sunriseField = document.getElementById("sunrise");
const sunsetField = document.getElementById("sunset");

// Returns formatted date for specififed offset from current date 
const formatDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
};

// const today = formatDate(0);
const tomorrow = formatDate(1);
const overmorrow = formatDate(2);

// Object to store weather data
const weatherInfo = {
    city: null,
    region: null,
    description: null,
    temperature: null,
    airQuality: null,
    pressure: null,
    uv: null,
    precipitation: null,
    wind: null,
    visibility: null,
    sunrise: null,
    sunset: null,
    icon: null,
    dayOneTemp: null,
    dayOneIcon: null,
    dayTwoTemp: null,
    dayTwoIcon: null,
    dayThreeTemp: null,
    dayThreeIcon: null
};

const getWeatherData = async (city) => {
    const forecastWeatherApi = `https://api.weatherapi.com/v1/forecast.json?key=1111111111&q=${city}&aqi=yes&days=3`;
    const forecastWeatherResponse = await fetch(forecastWeatherApi, {mode: "cors"});
    const forecastWeatherData = await forecastWeatherResponse.json();
    console.log(forecastWeatherData)

    return forecastWeatherData;
}

const saveWeatherData = async (city) => {
    await getWeatherData(city)
        .then((data) => {
            console.log(data)
            weatherInfo.city = data.location.name;
            weatherInfo.region = data.location.region;
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
            weatherInfo.icon = data.forecast.forecastday[0].day.condition.icon;
            weatherInfo.dayOneTemp = data.forecast.forecastday[0].day.avgtemp_c;
            weatherInfo.dayOneIcon = weatherInfo.icon;
            weatherInfo.dayTwoTemp = data.forecast.forecastday[1].day.avgtemp_c;
            weatherInfo.dayTwoIcon = data.forecast.forecastday[1].day.condition.icon;
            weatherInfo.dayThreeTemp = data.forecast.forecastday[2].day.avgtemp_c;
            weatherInfo.dayThreeIcon = data.forecast.forecastday[2].day.condition.icon;
        })
        .catch((err) => {
            console.log("Error Retrieving Weather Data", err);
        }
    )
}

const renderData = () => {
    const fields = [cityField, regionField, temperatureField, descriptionField, uvField, airQualityField, pressureField, visibilityField, precipitationField, windField, sunriseField, sunsetField];
    fields.forEach((field) => {
        const fieldName = field.id;
        const weatherInfoValue = weatherInfo[fieldName];

        if (weatherInfoValue === null || weatherInfoValue === undefined){
            field.textContent = "-";
        } else {
            field.textContent = weatherInfoValue;
        }
    })
    
    iconField.src = `${weatherInfo.dayOneIcon}`;
    dayOneTemp.innerHTML = `${weatherInfo.dayOneTemp} &deg;`;
    dayOneImg.src = `${weatherInfo.dayOneIcon}`;

    dayTwoTitle.textContent = tomorrow;
    dayTwoTemp.innerHTML = `${weatherInfo.dayTwoTemp} &deg;`;
    dayTwoImg.src = `${weatherInfo.dayTwoIcon}`;

    dayThreeTitle.textContent = overmorrow;
    dayThreeTemp.innerHTML = `${weatherInfo.dayThreeTemp} &deg;`;
    dayThreeImg.src = `${weatherInfo.dayThreeIcon}`;
}

searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value)
        .then(() => renderData());
})