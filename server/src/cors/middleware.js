const cors = require("cors");
require('dotenv').config();

// Configure CORS options
const corsOptions = {
    origin: process.env.ALLOWED_HOSTS,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  };


module.exports = cors(corsOptions);