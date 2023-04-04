import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5";
const imgUrl = "https://openweathermap.org/img/wn";

const getWeatherByCoord = (lat, lon) =>
  axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`).then(response => response.data);

const weather = {
  baseUrl,
  getWeatherByCoord,
  imgUrl,
}

export default weather;