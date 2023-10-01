const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const db_url = process.env.MONGODB_URL;
const secret_key = process.env.SECRET_KEY

const secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated Secret Key:", secret_key);

app.use(express.json());
app.use(cors());

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected successfully");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhoneNumberUser = await User.findOne({ phoneNumber });
    if (existingPhoneNumberUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
