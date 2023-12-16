/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import "./styles.css";
import search from "./assets/icons/search.png";
import sunrise from "./assets/icons/sunrise.png"
import sunset from "./assets/icons/sunset.png"
import newMoon from "./assets/icons/new-moon.png";
import waxingCrescent from "./assets/icons/waxing-crescent.png";
import firstQuarter from "./assets/icons/first-quarter.png";
import waxingGibbous from "./assets/icons/waxing-gibbous.png";
import fullMoon from "./assets/icons/full-moon.png";
import waningGibbous from "./assets/icons/waning-gibbous.png";
import lastQuarter from "./assets/icons/last-quarter.png";
import waningCrescent from "./assets/icons/waning-crescent.png";

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
const moonriseField = document.getElementById("moonrise");
const moonsetField = document.getElementById("moonset");

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
    moonrise: null,
    moonset: null,
    moonphase: null,
    icon: null,
    dayOneTemp: null,
    dayOneIcon: null,
    dayTwoTemp: null,
    dayTwoIcon: null,
    dayThreeTemp: null,
    dayThreeIcon: null
};

const getWeatherData = async (city) => {
    const forecastWeatherApi = `https://api.weatherapi.com/v1/forecast.json?key=d04037fa261e40e39e0142607230612&q=${city}&aqi=yes&days=3`;
    const forecastWeatherResponse = await fetch(forecastWeatherApi, {mode: "cors"});
    const forecastWeatherData = await forecastWeatherResponse.json();
    console.log("Getting forecast weather data:", forecastWeatherData)

    return forecastWeatherData;
}

const saveWeatherData = async (city) => {
    await getWeatherData(city)
        .then((data) => {
            console.log("Saving forecast weather data:", data);
            let moonphase = data.forecast.forecastday[0].astro.moon_phase;
            moonphase = moonphase.replace(/\s+/g, "-").toLowerCase();

            // Current local hour rounded up
            const currentLocalHour = data.location.localtime.split(" ")[1].split("").slice(0, 2).join("");
            const localHourRounded = (parseInt(currentLocalHour, 10) + 1);

            // Store relevant data
            weatherInfo.city = data.location.name;
            weatherInfo.region = data.location.region;
            weatherInfo.description = data.current.condition.text;
            weatherInfo.temperature = data.current.temp_c;
            weatherInfo.airQuality = data.current.air_quality["gb-defra-index"];
            weatherInfo.pressure = data.current.pressure_mb;
            weatherInfo.uv = data.current.uv;
            weatherInfo.precipitation = data.current.precip_mm;
            weatherInfo.wind = data.current.wind_kph;
            weatherInfo.visibility = data.current.vis_km;
            weatherInfo.sunrise = data.forecast.forecastday[0].astro.sunrise;
            weatherInfo.sunset = data.forecast.forecastday[0].astro.sunset;
            weatherInfo.moonrise = data.forecast.forecastday[0].astro.moonrise;
            weatherInfo.moonset = data.forecast.forecastday[0].astro.moonset;
            weatherInfo.moonphase = moonphase;
            weatherInfo.rainfallHours = [
                localHourRounded,
                localHourRounded + 1,
                localHourRounded + 2,
                localHourRounded + 3,
                localHourRounded + 4,
                localHourRounded + 5
            ];
            weatherInfo.chanceOfRainfall = [
                data.forecast.forecastday[0].hour[localHourRounded].chance_of_rain, 
                data.forecast.forecastday[0].hour[localHourRounded + 1].chance_of_rain,
                data.forecast.forecastday[0].hour[localHourRounded + 2].chance_of_rain,
                data.forecast.forecastday[0].hour[localHourRounded + 3].chance_of_rain,
                data.forecast.forecastday[0].hour[localHourRounded + 4].chance_of_rain,
                data.forecast.forecastday[0].hour[localHourRounded + 5].chance_of_rain
            ];
            weatherInfo.icon = data.forecast.forecastday[0].day.condition.icon;
            weatherInfo.dayOneTemp = data.forecast.forecastday[0].day.avgtemp_c;
            weatherInfo.dayOneIcon = weatherInfo.icon;
            weatherInfo.dayTwoTemp = data.forecast.forecastday[1].day.avgtemp_c;
            weatherInfo.dayTwoIcon = data.forecast.forecastday[1].day.condition.icon;
            weatherInfo.dayThreeTemp = data.forecast.forecastday[2].day.avgtemp_c;
            weatherInfo.dayThreeIcon = data.forecast.forecastday[2].day.condition.icon;
            console.log(weatherInfo.rainfallHours);
        })
        .catch((err) => {
            console.log("Error Retrieving Weather Data", err);
        }
    )
}

const renderData = () => {
    const rainfallTimeFields = document.querySelectorAll(".rainfall-hour");
    const rainfallDataFields = document.querySelectorAll(".rainfall-data");
    const fields = [cityField, regionField, temperatureField, descriptionField, uvField, pressureField, visibilityField, precipitationField, windField, sunriseField, sunsetField, moonriseField, moonsetField];
    
    fields.forEach((field) => {
        const fieldName = field.id;
        const weatherInfoValue = weatherInfo[fieldName];

        if (weatherInfoValue === null || weatherInfoValue === undefined){
            field.textContent = "-";
        } else {
            field.textContent = weatherInfoValue;
        }
    })

    // Set each time field from hour 1 - hour 6
    rainfallTimeFields.forEach((field, i) => {
        field.textContent = `${weatherInfo.rainfallHours[i]}:00`;
    })

    // Set each range bar value according to % chance of rain
    rainfallDataFields.forEach((field, i) => {
        field.value = weatherInfo.chanceOfRainfall[i];
    })
    
    airQualityField.textContent = weatherInfo.airQuality;

    iconField.src = `${weatherInfo.dayOneIcon}`;
    dayOneTemp.innerHTML = `${weatherInfo.dayOneTemp} &deg;`;
    dayOneImg.src = `${weatherInfo.dayOneIcon}`;

    dayTwoTitle.textContent = tomorrow;
    dayTwoTemp.innerHTML = `${weatherInfo.dayTwoTemp} &deg;`;
    dayTwoImg.src = `${weatherInfo.dayTwoIcon}`;

    dayThreeTitle.textContent = overmorrow;
    dayThreeTemp.innerHTML = `${weatherInfo.dayThreeTemp} &deg;`;
    dayThreeImg.src = `${weatherInfo.dayThreeIcon}`;

    const allCurrentMoons = document.querySelectorAll(".current-moon");
    allCurrentMoons.forEach(moon => moon.classList.remove("current-moon"));
    const matchingMoon = document.getElementById(`${weatherInfo.moonphase}`);
    matchingMoon.classList.add("current-moon");
}

searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value)
        .then(() => renderData());
})

// Display London data on first page load
// document.addEventListener("DOMContentLoaded", () => {
//     saveWeatherData("london")
//         .then(() => renderData());
// })