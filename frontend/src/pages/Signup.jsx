import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await register(username, email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] dark:from-[#020617] dark:to-[#0f172a] p-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Join Us</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Create your account to get started</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white"
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
