const express = require("express");
const router = express.Router();
const { Game, User, Score } = require("../models/index.js");

router.get("/test", (req, res) => {
  res.json({ message: "Hello from api server home!" });
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user." });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users." });
  }
});

// Create a new game
router.post("/games", async (req, res) => {
  try {
    const { status } = req.body;
    const newGame = await Game.create({ status });
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating game." });
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

// Create a new score using a game id
router.post("/games/:gameId/scores", async (req, res) => {
  try {
    const { gameOutcome } = req.body;
    const { gameId } = req.params;
    const newScore = await Score.create({ gameOutcome, gameId });
    res.status(201).json(newScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating score." });
  }
});

// get games played by user
router.get("/users/:userId/games", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: {
        model: Game,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user games." });
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

// get user scores
router.get("/users/:userId/scores", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: {
        model: Score,
        include: Game,
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user scores." });
  }
});

module.exports = router;
