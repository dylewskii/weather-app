import "./styles.css";
// eslint-disable-next-line no-unused-vars
import search from "./assets/icons/search.png";

const getWeatherData = async (location) => {
    const api = `https://api.weatherapi.com/v1/current.json?key=1111111111&q=${location}`;
    const response = await fetch(api, {mode: "cors"});
    const data = await response.json();

    return data;
}

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

getWeatherData("london")
    .then((data) => {
        console.log(data)
        weatherInfo.location = [data.location.name, data.location.region];
        // weatherInfo.location.push(data.location.name, data.location.region);
        weatherInfo.description = data.current.condition.text;
        weatherInfo.temperature = data.current.temp_c;
        weatherInfo.airQuality = null;
        weatherInfo.pressure = data.current.pressure_mb;
        weatherInfo.uv = data.current.uv;
        weatherInfo.precipitation = null;
        weatherInfo.wind = data.current.wind_kph;
        weatherInfo.visibility = data.current.wind_kph;
        weatherInfo.sunrise = null;
        weatherInfo.sunset = null;
    })