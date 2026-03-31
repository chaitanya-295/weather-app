import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// GET all favorites
router.get("/", async (req, res) => {
  const data = await Favorite.find();
  res.json(data);
});

// ADD favorite
router.post("/", async (req, res) => {
  const { city, country } = req.body;

  const newFav = new Favorite({ city, country });
  await newFav.save();

  res.json(newFav);
});

// DELETE favorite
router.delete("/:id", async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;