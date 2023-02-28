import { DateTime } from "luxon";

const API_KEY = ""; // My API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // This part of the URL is same for all API calls

// Same Function to call different API's by restructuring the URL
const getWeatherData = (infoType, searchParams) => { // searchParams is an object which will automatically convert into a query
    const url = new URL(BASE_URL + "/" + infoType); // infotype is what type of API we are calling
    // The URL() constructor returns a newly created URL object representing the URL defined by the parameters.
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});
    // The search property of the URL interface is a search string, also called a query string, that is a string containing a '?' followed by the parameters of the URL.
    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed},
    } = data;

    const {main: details, icon, description} = weather[0];

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, description, speed};
};

/** 
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1,6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(1,6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });

    return {timezone, daily, hourly};
};
*/

// weather is the endpoint which is used to get the data based on cityname
// onecall is the endpoint by which we get the hourly and daily data using lattitude and longitude
// In order to get the daily data we'll call the api using onecall endpoint
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);
    const {lat, lon} = formattedCurrentWeather;
    
    // onecall api requires subscription 
    /** 
    const formattedForecastWeather = await getWeatherData("onecall", {
        lat, lon, exclude: "current, minutely, alerts", units: searchParams.units, 
    }).then(formatForecastWeather);
    */
    // units is an extra parameter to get the data in the unit you want
    
    return {...formattedCurrentWeather,  /**  ...formattedForecastWeather */};
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/01d@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
