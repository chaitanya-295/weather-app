const RainCard = ({ forecast }) => {

  if (!forecast) return null;

  // 🔥 Take next 8 (24h)
  const rainData = forecast.list.slice(0, 8);

  // Calculate average probability
  const avgRain =
    rainData.reduce((acc, item) => acc + (item.pop || 0), 0) /
    rainData.length;

  const percent = Math.round(avgRain * 100);

  return (
    <div className="glass p-5">

      <h3 className="text-sm text-gray-500 mb-3">
        🌧 Rain Probability
      </h3>

      {/* VALUE */}
      <p className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
        {percent}%
      </p>

      {/* BAR */}
      <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />

      </div>

      {/* EXTRA INFO */}
      <p className="text-xs text-gray-500 mt-3">
        Based on next 24 hours forecast
      </p>

    </div>
  );
};

export default RainCard;