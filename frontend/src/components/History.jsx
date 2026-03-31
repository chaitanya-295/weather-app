const History = ({ history, onSelect }) => {

  return (
    <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow">

      {/* HEADER */}
      <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
        🔍 Recent Searches
      </h2>

      {/* LIST */}
      {history.slice(0, 5).map((item, i) => (
        <div
          key={i}
          onClick={() => onSelect(item.city)}
          className="cursor-pointer px-3 py-2 rounded-xl 
              flex justify-between items-center
             text-gray-700 dark:text-gray-200
             hover:bg-white/30 dark:hover:bg-white/10
             transition-all duration-300"
          >
          <span>{item.city}</span>
          <span className="text-xs text-gray-400">↗</span>
        </div>
      ))}

    </div>
  );
};

export default History;