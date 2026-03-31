import API from "./client";

// ⭐ FAVORITES
export const getFavorites = () => API.get("/favorites");

export const addFavorite = (data) =>
  API.post("/favorites", data);

export const removeFavorite = (city) =>
  API.delete("/favorites", { data: { city } });

// 🔍 HISTORY
export const getHistory = () => API.get("/history");

export const addHistory = (city) =>
  API.post("/history", { city });

export default API;