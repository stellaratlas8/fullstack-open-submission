import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  let [capital] = country.capital;

  useEffect(() => {
    weatherService
      .getWeatherByCoord(...country.capitalInfo.latlng)
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {});
  });

  if (weather === null) return <p>Loading weather...</p>;

  return (
    <div class="weather">
      <h4>Weather in {capital}</h4>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <img
        src={`${weatherService.imgUrl}/${weather.weather[0].icon}.png`}
        alt="Weather icon could not be loaded"
        width="50px"
      />
      <p>Wind speed: {weather.wind.speed}m/s</p>
    </div>
  );
};

export default Weather;