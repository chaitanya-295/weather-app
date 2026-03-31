import express from "express";
import History from "../models/History.js";

const router = express.Router();

// GET history
router.get("/history", async (req, res) => {
  try {
    const history = await History.find()
      .sort({ createdAt: -1 }) // latest first
      .limit(5);               // 🔥 only last 5

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD search
router.post("/", async (req, res) => {
  const { city } = req.body;

  const newSearch = new History({ city });
  await newSearch.save();

  res.json(newSearch);
});

export default router;