const express = require("express");
const apiRoutes = require("./src/routes/api");


const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});