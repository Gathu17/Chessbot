const express = require("express");
const apiRoutes = require("./src/routes/index");
const sequelize = require("./src/models/sequelize");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
