import API from "./client";

export const getCurrentWeather = (lat, lon) =>
  API.get(`/weather/current?lat=${lat}&lon=${lon}`);

export const getForecast = (lat, lon) =>
  API.get(`/weather/forecast?lat=${lat}&lon=${lon}`);

export const getWeatherByCity = (city) =>
  API.get(`/weather/city?city=${city}`);

export const getWeatherByCoords = (lat, lon) =>
  API.get(`/weather/current?lat=${lat}&lon=${lon}`);

export default API;