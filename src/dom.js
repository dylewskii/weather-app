/* eslint-disable no-param-reassign */
import { weatherInfo } from "./data";
import formatDate from "./utils";

// 3 Day Forecast Cards
// const dayOneTitle = document.querySelector(".day-one__title");
// const dayOneTemp = document.querySelector(".day-one__temp");
// const dayOneImg = document.querySelector(".day-one__img");
// const dayTwoTitle = document.querySelector(".day-two__title");
// const dayTwoTemp = document.querySelector(".day-two__temp");
// const dayTwoImg = document.querySelector(".day-two__img");
// const dayThreeTitle = document.querySelector(".day-three__title");
// const dayThreeTemp = document.querySelector(".day-three__temp");
// const dayThreeImg = document.querySelector(".day-three__img");

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

// Render Object data on screen.
export default function renderData () {
    // --- LOCALTIMEZONE ---
    localTimezoneField.textContent = weatherInfo.localTimezone;
    
    // ---  MAIN PANEL ---
    iconField.src = weatherInfo.icon;
    // dayOneTemp.innerHTML = `${weatherInfo.dayOneTemp} &deg;`;
    // dayOneImg.src = weatherInfo.icon;

    // dayTwoTitle.textContent = formatDate(1);
    // dayTwoTemp.innerHTML = `${weatherInfo.dayTwoTemp} &deg;`;
    // dayTwoImg.src = weatherInfo.dayTwoIcon;

    // dayThreeTitle.textContent = formatDate(2);
    // dayThreeTemp.innerHTML = `${weatherInfo.dayThreeTemp} &deg;`;
    // dayThreeImg.src = weatherInfo.dayThreeIcon;

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
        icon.src = `${weatherInfo.dailyIcons[i]}`;
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