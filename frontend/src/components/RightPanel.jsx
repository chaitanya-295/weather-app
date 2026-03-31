import { useState } from "react";
import { motion } from "framer-motion";

const RightPanel = ({ forecast }) => {

  const [tab, setTab] = useState("today");

  if (!forecast) return <div>Loading...</div>;

  const todayData = forecast.list.slice(0, 8);
  const tomorrowData = forecast.list.slice(8, 16);
  const dailyData = forecast.list.filter((_, i) => i % 8 === 0);

  let dataToShow = todayData;

  if (tab === "tomorrow") dataToShow = tomorrowData;
  if (tab === "10days") dataToShow = dailyData;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass p-5 flex flex-col"
    >

      {/* 🔹 TABS */}
      <div className="flex gap-6 mb-4 border-b border-white/20 pb-2">

        {["today", "tomorrow", "10days"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative text-sm font-medium transition ${
              tab === t
                ? "text-blue-500"
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            }`}
          >
            {t === "today" && "Today"}
            {t === "tomorrow" && "Tomorrow"}
            {t === "10days" && "10 Days"}

            {/* Smooth underline */}
            {tab === t && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-blue-500 rounded-full"
              />
            )}
          </button>
        ))}

      </div>

      {/* 🔹 LIST */}
      <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-1 custom-scroll">

        {dataToShow.map((item, i) => {
          const date = new Date(item.dt * 1000);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex justify-between items-center p-3 rounded-2xl bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  className="w-9 h-9"
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    {tab === "10days"
                      ? date.toLocaleDateString("en-US", { weekday: "short" })
                      : date.getHours() + ":00"}
                  </p>

                  <p className="text-xs text-gray-500 capitalize">
                    {item.weather[0].description}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {Math.round(item.main.temp)}°
                </h3>
                <p className="text-[11px] text-gray-400">
                  {item.main.humidity}%
                </p>
              </div>

            </motion.div>
          );
        })}

      </div>

    </motion.div>
  );
};

export default RightPanel;