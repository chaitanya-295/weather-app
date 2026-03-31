import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("weather_user"));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setUser(response.data);
      localStorage.setItem("weather_user", JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      setUser(response.data);
      localStorage.setItem("weather_user", JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("weather_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
