const StatsGrid = ({ weather }) => {

  const stats = [
    { label: "Air Quality", value: "156" },
    { label: "Wind", value: weather.wind.speed + " m/s" },
    { label: "Humidity", value: weather.main.humidity + "%" },
    { label: "Visibility", value: weather.visibility / 1000 + " km" },
    { label: "Pressure", value: weather.main.pressure + " hPa" },
    { label: "Clouds", value: weather.clouds.all + "%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      {stats.map((s, i) => (
        <div key={i} className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg p-4 rounded-2xl">
          <p className="text-gray-400 text-sm">{s.label}</p>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{s.value}</h2>
        </div>
      ))}

    </div>
  );
};

export default StatsGrid;