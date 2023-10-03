const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const db_url = process.env.MONGODB_URL;
const secret_key = process.env.SECRET_KEY

let savedToken = null;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.userId = decoded.userId; 
    next();
  });
};

app.get('/api/user', authenticateJWT, async (req, res) => {
  try {
   
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phoneNumber: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
  try {
    const { name, username, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username not Available" });
    }

    const existingPhoneNumberUser = await User.findOne({ phoneNumber });
    if (existingPhoneNumberUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      username,
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
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secret_key, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });

    
    res.status(200).json({ token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});



app.get('/api/token', async (req, res) => {
  res.send("Hello from Server")
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
