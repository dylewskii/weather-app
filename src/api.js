import { setMainWeatherInfo, appendNextSixHours, appendRainfallAndTemps } from "./data";

// Retrieves Weather API data
export const getWeatherData = async (city) => {
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

// Orchestrates the Weather Data retrieval and storage
export const saveWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);
        console.log("Saving forecast weather data:", data);

        setMainWeatherInfo(data);
        appendNextSixHours(data);
        appendRainfallAndTemps(data);

    } catch (error) {
        console.error("Error Retrieving Weather Data", error);
    }
};