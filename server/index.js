const express = require("express");
const apiRoutes = require("./src/routes/api");
const sequelize = require("./src/models/sequelize");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 8000;


const corsMiddleware = require("./src/cors/middleware");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.use("/api", apiRoutes);

// Run migrations here
sequelize
  .authenticate()
  .then(async () => {
    console.log("Connected to the database");
    await sequelize.sync(); // This will create the tables
    console.log("Tables synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
