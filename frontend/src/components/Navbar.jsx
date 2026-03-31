import { useState, useContext } from "react";
import { FaSearch, FaSun, FaMoon, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onSearch(input);
    setInput("");
    setShowSearch(false);
  };

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-4 sm:px-6 py-4 shadow-lg sm:max-w-6xl sm:mx-auto">
      {/* 🔥 DESKTOP NAVBAR (3-COLUMN GRID) */}
      <div className="hidden sm:grid grid-cols-3 items-center">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🌤</span>
          <h1 className="font-semibold text-gray-800 dark:text-white">
            SkyCast
          </h1>
        </div>

        {/* CENTER SEARCH */}
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="flex items-center bg-white/50 dark:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md w-full max-w-md border border-white/10">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search city..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-800 dark:text-white"
            />
          </div>
        </form>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-3">
          {/* Simple User Identity (No background/circle) */}
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 mr-1">
             <span className="text-sm font-medium">
               {user?.username}
             </span>
          </div>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 hover:bg-white/60 transition-all border border-white/10"
          >
            {dark ? <FaMoon /> : <FaSun />}
          </button>

          <button
            onClick={() =>
              navigator.geolocation.getCurrentPosition((pos) => {
                onSearch(`${pos.coords.latitude},${pos.coords.longitude}`);
              })
            }
            className="bg-blue-500/80 hover:bg-blue-600 text-white px-3 py-2.5 rounded-xl leading-none transition-colors border border-white/10 shadow-sm"
          >
            📍
          </button>

          <button
            onClick={logout}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-400/10 hover:bg-red-400/20 text-red-500 border border-red-500/10 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE NAVBAR */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌤</span>
            <h1 className="font-semibold text-gray-800 dark:text-white">SkyCast</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
              {user?.username}
            </span>

            <button
              onClick={() => setShowSearch(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/10"
            >
              <FaSearch className="text-sm" />
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/10"
            >
              {dark ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
            </button>

            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500"
            >
              <FaSignOutAlt className="text-sm" />
            </button>
          </div>
        </div>

        {showSearch && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center mt-3 bg-white/50 dark:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md w-full border border-white/20"
          >
            <input
              type="text"
              placeholder="Search city..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-800 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="ml-2 text-gray-500"
            >
              <FaTimes />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Navbar;