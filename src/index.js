/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
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
const localTimezoneField = document.getElementById("local-timezone");
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

// Timeframe Panel Fields
const dailyTitles = document.querySelectorAll(".daily-title");
const dailyIcons = document.querySelectorAll(".daily-icon");
const dailyTemps = document.querySelectorAll(".daily-temp");
const hourlyTitles = document.querySelectorAll(".hourly-title");
const hourlyIcons = document.querySelectorAll(".hourly-icon");
const hourlyTemps = document.querySelectorAll(".hourly-temp");

// Timeframe (daily/hourly) Controls
const timeframeControls = document.querySelector(".timeframe-controls");
const dailySlotsDiv = document.querySelector(".daily-slots");
const hourlySlotsDiv = document.querySelector(".hourly-slots");

// Returns formatted date for specififed offset from current date 
const formatDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
};

// Object to store weather data
const weatherInfo = {};

// Retrieve data from Weather API
const getWeatherData = async (city) => {
    try {
        const forecastWeatherApi = `https://api.weatherapi.com/v1/forecast.json?key=d04037fa261e40e39e0142607230612&q=${city}&aqi=yes&days=3`;
        const forecastWeatherResponse = await fetch(forecastWeatherApi, { mode: "cors" });

        if (!forecastWeatherResponse.ok) {
            throw new Error(`Failed to fetch weather data. Status: ${forecastWeatherResponse.status}`);
        }

        const forecastWeatherData = await forecastWeatherResponse.json();
        console.log("Getting forecast weather data:", forecastWeatherData);
        return forecastWeatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

// Save API data to weatherInfo Object.
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
            weatherInfo.localTimezone = data.location.localtime;
            weatherInfo.nextSixHours = [];
            weatherInfo.nextSixTemps = [];
            weatherInfo.nextSixIcons = [];
            weatherInfo.chanceOfRainfall = [];
            weatherInfo.icon = data.forecast.forecastday[0].day.condition.icon;
            weatherInfo.dayIcons = [
                weatherInfo.dayOneIcon = weatherInfo.icon,
                weatherInfo.dayTwoIcon = data.forecast.forecastday[1].day.condition.icon,
                weatherInfo.dayThreeIcon = data.forecast.forecastday[2].day.condition.icon
            ]
            weatherInfo.dayOneTemp = data.forecast.forecastday[0].day.avgtemp_c;
            weatherInfo.dayOneIcon = weatherInfo.icon;
            weatherInfo.dayTwoTemp = data.forecast.forecastday[1].day.avgtemp_c;
            weatherInfo.dayTwoIcon = data.forecast.forecastday[1].day.condition.icon;
            weatherInfo.dayThreeTemp = data.forecast.forecastday[2].day.avgtemp_c;
            weatherInfo.dayThreeIcon = data.forecast.forecastday[2].day.condition.icon;
            weatherInfo.dailyIcons = [
                data.forecast.forecastday[0].day.condition.icon,
                data.forecast.forecastday[1].day.condition.icon,
                data.forecast.forecastday[2].day.condition.icon
            ];
            weatherInfo.dailyAvgCelsius = [
                data.forecast.forecastday[0].day.avgtemp_c,
                data.forecast.forecastday[1].day.avgtemp_c,
                data.forecast.forecastday[2].day.avgtemp_c
            ];

            // Appends next 6 hrs starting from current local time to nextSixHours array.
            for (let i = 0; i < 6; i++){
                if (localHourRounded + i > 23){
                    // Check if the hour falls into the following day.
                    const localHourNextDay = (((localHourRounded + i) % 23) - 1);
                    weatherInfo.nextSixHours.push(localHourNextDay);
                } else {
                    weatherInfo.nextSixHours.push(localHourRounded + i)
                }
            }
            console.log("next six hours: ", weatherInfo.nextSixHours )

            // Appends chance of rain % for each hour within nextSixHours array.
            // Appends hourly temperatures (C) to nextSixTemps array.
            for (let i = 0; i < weatherInfo.nextSixHours.length; i++) {
                const currentHour = weatherInfo.nextSixHours[i];
                const startingHour = weatherInfo.nextSixHours[0];
              
                if (currentHour >= startingHour) {
                    weatherInfo.chanceOfRainfall.push(data.forecast.forecastday[0].hour[currentHour].chance_of_rain);
                    weatherInfo.nextSixTemps.push(data.forecast.forecastday[0].hour[currentHour].temp_c);
                    weatherInfo.nextSixIcons.push(data.forecast.forecastday[0].hour[currentHour].condition.icon);
                } else {
                    weatherInfo.chanceOfRainfall.push(data.forecast.forecastday[1].hour[currentHour].chance_of_rain);
                    weatherInfo.nextSixTemps.push(data.forecast.forecastday[1].hour[currentHour].temp_c);
                    weatherInfo.nextSixIcons.push(data.forecast.forecastday[1].hour[currentHour].condition.icon);
                }
            }

            // console.log("rainfall % chance for each hour: ", weatherInfo.chanceOfRainfall)
            // console.log("next six temps: ", weatherInfo.nextSixTemps);
        })
        .catch((err) => {
            console.log("Error Retrieving Weather Data", err);
        }
    )
}

// Render Object data on screen.
const renderData = () => {
    // --- LOCALTIMEZONE ---
    localTimezoneField.textContent = weatherInfo.localTimezone;
    
    // ---  MAIN PANEL ---
    iconField.src = weatherInfo.dayOneIcon;
    dayOneTemp.innerHTML = `${weatherInfo.dayOneTemp} &deg;`;
    dayOneImg.src = weatherInfo.dayOneIcon;

    dayTwoTitle.textContent = formatDate(1);
    dayTwoTemp.innerHTML = `${weatherInfo.dayTwoTemp} &deg;`;
    dayTwoImg.src = weatherInfo.dayTwoIcon;

    dayThreeTitle.textContent = formatDate(2);
    dayThreeTemp.innerHTML = `${weatherInfo.dayThreeTemp} &deg;`;
    dayThreeImg.src = weatherInfo.dayThreeIcon;

    // --- DETAILS PANEL ---
    airQualityField.textContent = weatherInfo.airQuality;

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

    // --- DAILY/HOURLY PANEL ---
    // daily
    dailyTitles.forEach((title, i) => {
        title.textContent = `${formatDate(i + 1)}`;
    })

    dailyIcons.forEach((icon, i) => {
        icon.src = `${weatherInfo.dailyIcons[i]}`
    })

    dailyTemps.forEach((temp, i) => {
        temp.textContent = weatherInfo.dailyAvgCelsius[i];
    })

    // hourly
    hourlyTitles.forEach((title, i) => {
        title.textContent = `${weatherInfo.nextSixHours[i]}:00`;
    })

    hourlyIcons.forEach((icon, i) => {
        icon.src = `${weatherInfo.nextSixIcons[i]}`;
    })

    hourlyTemps.forEach((hour, i) => {
        hour.textContent = `${weatherInfo.nextSixTemps[i]}`;
    })

    // --- CHANCE OF RAINFALL PANEL ---
    // Set each time field from Hour 1 -> Hour 6
    rainfallTimeFields.forEach((field, i) => {
        if (weatherInfo.nextSixHours[i] < 10){
            field.textContent = `0${weatherInfo.nextSixHours[i]}:00`;
        } else {
            field.textContent = `${weatherInfo.nextSixHours[i]}:00`;
        }
    })

    // Set each range bar value according to % chance of rain
    rainfallDataFields.forEach((field, i) => {
        field.value = `${weatherInfo.chanceOfRainfall[i]}`;
    })

     // --- MOON PANEL ---
    const allCurrentMoons = document.querySelectorAll(".current-moon");
    allCurrentMoons.forEach(moon => moon.classList.remove("current-moon"));
    const matchingMoon = document.getElementById(`${weatherInfo.moonphase}`);
    matchingMoon.classList.add("current-moon");
}

// Event Listeners
searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value)
        .then(() => renderData());
})

timeframeControls.addEventListener(("click"), (e) => {
    const activeBtns = document.querySelectorAll(".active");
    if (e.target.matches(".timeframe-btn")){
        activeBtns.forEach((button) => button.classList.remove("active"))
        e.target.classList.toggle("active");

        const isDaily = e.target.textContent === "Daily";
        dailySlotsDiv.className = isDaily ? "daily-slots" : "daily-slots hidden";
        hourlySlotsDiv.className = isDaily ? "hourly-slots hidden" : "hourly-slots";
    }
})

// Display London data on first page load
// document.addEventListener("DOMContentLoaded", () => {
//     saveWeatherData("london")
//         .then(() => renderData());
// })