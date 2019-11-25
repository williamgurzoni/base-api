const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

// Inicializa App
const app = express();

// Define porta (local/server)
const port = process.env.PORT || 3001;
const urlMongo =
  "mongodb+srv://base-api:Pq1uNexDxDKTHtUq@cluster0-opd3r.mongodb.net/test?retryWrites=true&w=majority";

// Inicializa DB
mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true });
// user base-api
// pass Pq1uNexDxDKTHtUq

// Resgata models
requireDir("./models");

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port);
