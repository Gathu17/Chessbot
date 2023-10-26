const express = require("express");
const router = express.Router();
const { Game, User, Score } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/test", (req, res) => {
  res.json({ message: "Hello from api server home!" });
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const newUser = await User.create({ name, email, phoneNumber, password });
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

// const authenticateJWT = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, secret_key, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });

//     req.userId = decoded.userId;
//     next();
//   });
// };

router.post("/signup", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const existingUserWithEmail = await User.findOne({ where: { email } });
    if (existingUserWithEmail) {
      return res.status(409).json({ error: "Email already in use." });
    }

    const existingUserWithPhoneNumber = await User.findOne({
      where: { phoneNumber },
    });
    if (existingUserWithPhoneNumber) {
      return res.status(409).json({ error: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user." });
  }
});

//Auth
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5s",
      }
    );


    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login." });
  }
});

module.exports = router;
