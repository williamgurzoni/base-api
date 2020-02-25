const express = require("express");
const cors = require("cors");
const requireDir = require("require-dir");
require("dotenv").config();

const auth = require("./middleware/auth");
const sequelize = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(auth);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Models
requireDir("./models");

// Sync database structure
// sequelize.sync({ force: false });

// Routes
app.use("/api", require("./routes"));

// app.use("/api", (req, res) => console.log('----', req.body));

app.listen(process.env.PORT);
