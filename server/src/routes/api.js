const express = require("express");
const router = express.Router();
const { Game, User, Score } = require("../models/sequalize");

router.get("/test", (req, res) => {
  res.json({ message: "Hello from api server home!" });
});

// Create a new user
// router.post("/users", async (req, res) => {
//   try {
//     const { username } = req.body;
//     const newUser = await User.create({ username });
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error creating user." });
//   }
// });

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users." });
  }
});

// Get all games
router.get("/games", async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching games." });
  }
});

// Get all scores
router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.findAll();
    res.json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching scores." });
  }
});

module.exports = router;
