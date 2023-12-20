/* eslint-disable no-plusplus */

// Object to store weather data
export const weatherInfo = {
    chanceOfRainfall: [],
    nextSixHours: [],
    nextSixTemps: [],
    nextSixIcons: []
};

// Sets values for the main weatherInfo object
export const setMainWeatherInfo = (data) => {
    const moonphase = data.forecast.forecastday[0].astro.moon_phase.replace(/\s+/g, "-").toLowerCase();

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
    weatherInfo.icon = data.current.condition.icon;
    weatherInfo.dayOneTemp = data.forecast.forecastday[0].day.avgtemp_c;
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
};

// Appends next 6 hours starting from current local time to nextSixHours array.
export const appendNextSixHours = (data) => {
    weatherInfo.nextSixHours = [];

    const currentLocalHour = data.location.localtime.split(" ")[1].split("").slice(0, 2).join("");
    const localHourRounded = (parseInt(currentLocalHour, 10) + 1);

    for (let i = 0; i < 6; i++) {
        if (localHourRounded + i > 23) {
            // Check if the hour falls into the following day.
            const localHourNextDay = (((localHourRounded + i) % 23) - 1);
            weatherInfo.nextSixHours.push(localHourNextDay);
        } else {
            weatherInfo.nextSixHours.push(localHourRounded + i);
        }
    }
    // console.log("next six hours: ", weatherInfo.nextSixHours);
};

// Appends chance of rain % for each hour within nextSixHours array.
// Appends hourly temperatures (C) to nextSixTemps array.
export const appendRainfallAndTemps = (data) => {
    weatherInfo.chanceOfRainfall = [];

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

    // console.log("next six icons", weatherInfo.nextSixIcons)
    // console.log("next six temps", weatherInfo.nextSixTemps)
    // console.log("chance of rainfall", weatherInfo.chanceOfRainfall)
};