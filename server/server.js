const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const routes = require("./routes");

const app = express();

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

// PARSING
app.use(bodyParser.json());

// SANITIZE
app.use(xss());
app.use(mongoSanitize());

// ROUTES
app.use("/api", routes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
