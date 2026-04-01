const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { protect } = require("./middleware/authMiddleware");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

const API_KEY = process.env.API_KEY;

// Database client
const supabase = require("./config/supabase");

// Routes
const authRoutes = require("./routes/auth");


app.use("/api/auth", authRoutes);

// 🌦 WEATHER APIs

// Current weather
app.get("/api/weather/current", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: { lat, lon, units: "metric", appid: API_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Current weather error:", error.response?.data || error.message);
    res.status(500).json({ error: "Weather fetch failed" });
  }
});

// Forecast
app.get("/api/weather/forecast", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: { lat, lon, units: "metric", appid: API_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Forecast error:", error.response?.data || error.message);
    res.status(500).json({ error: "Forecast fetch failed" });
  }
});

// Weather by city
app.get("/api/weather/city", async (req, res) => {
  const { city } = req.query;
  try {
    const geo = await axios.get(
      "http://api.openweathermap.org/geo/1.0/direct",
      {
        params: { q: city, limit: 1, appid: API_KEY },
      }
    );

    if (!geo.data.length) return res.status(404).json({ error: "City not found" });

    const { lat, lon } = geo.data[0];

    const current = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { lat, lon, units: "metric", appid: API_KEY },
    });

    const forecast = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: { lat, lon, units: "metric", appid: API_KEY },
    });

    res.json({ current: current.data, forecast: forecast.data });
  } catch (error) {
    console.error("City weather error:", error.response?.data || error.message);
    res.status(500).json({ error: "City weather fetch failed" });
  }
});

// ⭐ FAVORITES ROUTES (PROTECTED)
app.get("/api/favorites", protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', req.user.id);
      
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

app.post("/api/favorites", protect, async (req, res) => {
  const { city, country } = req.body;
  try {
    const { data: existing, error: errExist } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('city', city)
      .single();

    if (existing) return res.json({ message: "Already in favorites" });

    const { data: fav, error } = await supabase
      .from('favorites')
      .insert([{ user_id: req.user.id, city, country }])
      .select()
      .single();

    if (error) throw error;
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

app.delete("/api/favorites", protect, async (req, res) => {
  const { city } = req.body;
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', req.user.id)
      .eq('city', city);
      
    if (error) throw error;
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// 🔍 HISTORY ROUTES (PROTECTED)
app.get("/api/history", protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('searched_at', { ascending: false })
      .limit(10);
      
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

app.post("/api/history", protect, async (req, res) => {
  const { city } = req.body;
  try {
    // Delete existing entry if present, to act like an upsert without needing a unique constraint in the logic just yet
    await supabase.from('history').delete().eq('user_id', req.user.id).eq('city', city);
    
    const { data: updatedHistory, error } = await supabase
      .from('history')
      .insert([{ user_id: req.user.id, city, searched_at: new Date().toISOString() }])
      .select()
      .single();
      
    if (error) throw error;
    res.json(updatedHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});