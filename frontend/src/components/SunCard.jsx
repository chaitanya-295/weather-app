const SunCard = ({ weather }) => {

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg p-6 rounded-3xl">

      <h2 className="text-gray-500 mb-4">Sun & Moon Summary</h2>

      <div className="flex justify-between">

        <div>
          <p className="text-gray-400">Sunrise</p>
          <h3 className="text-gray-800 dark:text-white">{sunrise}</h3>
        </div>

        <div>
          <p className="text-gray-400">Sunset</p>
          <h3 className="text-gray-800 dark:text-white">{sunset}</h3>
        </div>

      </div>

    </div>
  );
};

export default SunCard;