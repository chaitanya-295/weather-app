const WeatherSummary = ({ weather, forecast }) => {

  if (!weather || !forecast) return null;

  const condition = weather.weather[0].main.toLowerCase();
  const temp = weather.main.temp;

  // 🌧 Rain check (next 8 entries)
  const rainChance = forecast.list
    .slice(0, 8)
    .some((item) => item.pop > 0.4);

  let summary = "";

  // 🔥 LOGIC
  if (condition.includes("rain")) {
    summary = "🌧 Rain expected today. Carry an umbrella.";
  } else if (condition.includes("cloud")) {
    summary = "☁ Cloudy weather today.";
  } else if (condition.includes("clear")) {
    summary = "☀ Clear sky. Perfect day outside.";
  } else {
    summary = "🌤 Weather looks stable today.";
  }

  // 🌡 Temperature insight
  if (temp > 32) {
    summary += " It's quite hot. Stay hydrated.";
  } else if (temp < 15) {
    summary += " It's cold. Wear warm clothes.";
  }

  // 🌧 Rain insight
  if (rainChance) {
    summary += " Light rain possible later.";
  }

  // 🧠 Best time suggestion
  let bestTime = "Evening";

  if (temp < 30 && !rainChance) bestTime = "Afternoon";
  if (rainChance) bestTime = "Morning";

  return (
    <div className="glass p-5">

      <h3 className="text-sm text-gray-500 mb-3">
        🧠 AI Weather Insight
      </h3>

      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
        {summary}
      </p>

      <p className="mt-3 text-xs text-blue-500">
        Best time to go out: {bestTime}
      </p>

    </div>
  );
};

export default WeatherSummary;