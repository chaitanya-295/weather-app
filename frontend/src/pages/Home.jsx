import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import { getCurrentWeather, getForecast, getWeatherByCity } from "../api/weather";
import { getFavorites, getHistory, addHistory } from "../api/db";
import Favorites from "../components/Favorites";
import History from "../components/History";

const Home = () => {

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // 🌍 Load initial data
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setCoords({ lat, lon });

      const current = await getCurrentWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);

      setWeather(current.data);
      setForecast(forecastData.data);
      setLoading(false);

      // ⭐ Load DB data
      const favRes = await getFavorites();
      const histRes = await getHistory();

      setFavorites(favRes.data);
      setHistory(histRes.data);

    });
  }, []);

  // 🔄 ⭐ REFRESH FAVORITES (NEW FUNCTION)
  const refreshFavorites = async () => {
    const updated = await getFavorites();
    setFavorites(updated.data);
  };

  // 🔍 Search city
  const handleSearch = async (city) => {
    try {
      setLoading(true);

      const res = await getWeatherByCity(city);

      setWeather(res.data.current);
      setForecast(res.data.forecast);

      // 🔥 Save history
      await addHistory(city);

      // 🔄 Refresh history
      const updatedHistory = await getHistory();
      setHistory(updatedHistory.data);

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // 🗺 Map click
  const handleMapClick = async (lat, lon) => {
    try {
      setLoading(true);

      const current = await getCurrentWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);

      setWeather(current.data);
      setForecast(forecastData.data);
      setCoords({ lat, lon });

      setLoading(false);

    } catch (err) {
      console.log("Map click error:", err);
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] dark:from-[#020617] dark:to-[#0f172a] px-4 md:px-6 xl:px-10 py-6">

    {/* Navbar */}
    <Navbar onSearch={handleSearch} />

    {/* Content */}
    {loading ? (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading weather...
      </div>
    ) : weather && forecast ? (

      <div className="mt-6">

        {/* ✅ FULL WIDTH DASHBOARD */}
        <Dashboard
          weather={weather}
          forecast={forecast}
          coords={coords}
          onMapClick={handleMapClick}
          refreshFavorites={refreshFavorites}
          favorites={favorites}
          history={history}
          onSelect={handleSearch}
        />

      </div>

    ) : (
      <div className="text-center mt-10 text-red-500">
        Failed to load data
      </div>
    )}

  </div>
);
};

export default Home;