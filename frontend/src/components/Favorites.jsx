const Favorites = ({ favorites, onSelect }) => {

  return (
    <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-3xl p-5">

      {/* HEADER */}
      <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
        ⭐ Favorites
      </h2>

      {/* EMPTY */}
      {favorites.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No favorites yet
        </p>
      ) : (

        <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-1">

          {favorites.map((item, i) => (
            <div
              key={i}
              onClick={() => onSelect(item.city)}
              className="flex justify-between items-center bg-white/50 dark:bg-white/10 px-4 py-2 rounded-xl cursor-pointer hover:scale-[1.02] transition"
            >

              {/* LEFT */}
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {item.city}
                </p>
                <p className="text-xs text-gray-400">
                  {item.country}
                </p>
              </div>

              {/* RIGHT ICON */}
              <span className="text-yellow-400 text-lg">
                ⭐
              </span>

            </div>
          ))}

        </div>

      )}

    </div>
  );
};

export default Favorites;