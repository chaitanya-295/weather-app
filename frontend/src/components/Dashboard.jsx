import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatsGrid from "./StatsGrid";
import SunCard from "./SunCard";
import RightPanel from "./RightPanel";
import MapView from "./MapView";
import Favorites from "./Favorites";
import History from "./History";
import { addFavorite, removeFavorite } from "../api/db";
import TemperatureChart from "./TemperatureChart";
import RainCard from "./RainCard";
import WeatherSummary from "./WeatherSummary";

const Dashboard = ({
  weather,
  forecast,
  coords,
  onMapClick,
  refreshFavorites,
  favorites,
  history,
  onSelect
}) => {

  const [isFav, setIsFav] = useState(false);

  // 🔥 Detect if already favorite
  useEffect(() => {
    if (!favorites) return;

    const exists = favorites.find(
      (f) => f.city === weather?.name
    );

    setIsFav(!!exists);
  }, [weather, favorites]);

  if (!weather) return null;

  return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 mt-6 pb-10">
        {/* 🟦 LEFT */}
        <div className="xl:col-span-7 md:col-span-2 flex flex-col gap-6">
          {/* 🌤 CURRENT WEATHER */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} whileHover={{ scale: 1.02 }} className="glass p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Current Weather</h2>
                <p className="text-sm text-gray-500 mt-1">📍 {weather?.name}, {weather?.sys?.country}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Today</span>
                {/* ⭐ ANIMATED BUTTON */}
                <motion.button whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.15 }} onClick={async () => {
                  if (isFav) {
                    await removeFavorite(weather.name);
                  } else {
                    await addFavorite({
                      city: weather.name,
                      country: weather.sys.country,
                    });
                  }
                  refreshFavorites && refreshFavorites();
                }}
                className={`px-3 py-2 rounded-xl ${isFav ? "bg-yellow-400 text-black shadow-md" : "bg-white/40 text-gray-400"}`}>
                ⭐
                </motion.button>
              </div>  
            </div>
          <div className="flex items-center gap-6 mt-5">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">{Math.round(weather.main.temp)}°C</h1>
            <p className="text-gray-500 capitalize">{weather.weather[0].description}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-400">Feels like {Math.round(weather.main.feels_like)}°</p>
      </motion.div>

      {/* 🔥 STAGGERED COMPONENTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TemperatureChart forecast={forecast} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <RainCard forecast={forecast} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <WeatherSummary weather={weather} forecast={forecast} />
      </motion.div>

      <StatsGrid weather={weather} />
      <SunCard weather={weather} />

    </div>

    {/* 🟪 RIGHT SIDE (5 COLS WRAPPER) */}
    <div className="xl:col-span-5 flex flex-col gap-6">

      {/* TOP ROW → Forecast + Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* 🔮 FORECAST (3 cols) */}
        <div className="md:col-span-3">
          <RightPanel forecast={forecast} />
        </div>

        {/* 📦 SIDEBAR (2 cols) */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* OVERVIEW (same as your old code) */}
          <div className="glass p-4 space-y-3">
            {/* TITLE */}
            <h3 className="text-xs text-gray-400 uppercase tracking-wide">
              Overview
            </h3>

            {/* TOP SECTION */}
            <div className="flex items-center justify-between">

              {/* LEFT */}
              <div>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {Math.round(weather.main.temp)}°C
                </p>

                <p className="text-sm text-gray-500 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>

              {/* RIGHT ICON */}
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} className="w-10 h-10"/>
            </div>

            {/* MINI STATS */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/40 dark:bg-white/10 rounded-xl p-2 text-center">
                💧 {weather.main.humidity}%
              </div>
              <div className="bg-white/40 dark:bg-white/10 rounded-xl p-2 text-center">
                🌬 {weather.wind.speed} m/s
              </div>
              <div className="bg-white/40 dark:bg-white/10 rounded-xl p-2 text-center">
                🌡 {Math.round(weather.main.feels_like)}°
              </div>
              <div className="bg-white/40 dark:bg-white/10 rounded-xl p-2 text-center">
                ☁ {weather.clouds.all}%
              </div>
            </div>
          </div>
          <Favorites favorites={favorites} onSelect={onSelect} />

          <History history={history} onSelect={onSelect} />
        </div>
      </div>

      {/* 🌍 MAP FULL WIDTH BELOW BOTH */}
      <div className="glass p-4">
        <h3 className="text-sm text-gray-500 mb-3">🌍 Map</h3>

        <div className="w-full h-[350px] rounded-2xl overflow-hidden">
          <MapView
            lat={coords?.lat}
            lon={coords?.lon}
            city={weather?.name}
            onMapClick={onMapClick}
          />
        </div>
      </div>
    </div>
  </motion.div>
);
};

export default Dashboard;