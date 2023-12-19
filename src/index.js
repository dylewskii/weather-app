/* eslint-disable no-unused-vars */
import "./styles.css";
import renderData from "./dom";
import { saveWeatherData } from "./api";

// Icons
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

// Timeframe (daily/hourly) Controls
const timeframeControls = document.querySelector(".timeframe-controls");
const dailySlotsDiv = document.querySelector(".daily-slots");
const hourlySlotsDiv = document.querySelector(".hourly-slots");


// Event Listeners
searchBtn.addEventListener(("click"), () => {
    if (!searchBox.value) return;

    saveWeatherData(searchBox.value)
        .then(() => renderData());
})

timeframeControls.addEventListener(("click"), (e) => {
    const activeBtns = document.querySelectorAll(".active");
    if (e.target.matches(".timeframe-btn")){
        activeBtns.forEach((button) => button.classList.remove("active"));
        e.target.classList.toggle("active");

        const isDaily = e.target.textContent === "Daily";
        dailySlotsDiv.className = isDaily ? "daily-slots" : "daily-slots hidden";
        hourlySlotsDiv.className = isDaily ? "hourly-slots hidden" : "hourly-slots";
    }
})

// Display London data on first page load
document.addEventListener("DOMContentLoaded", () => {
    saveWeatherData("london")
        .then(() => renderData());
})