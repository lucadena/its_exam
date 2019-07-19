const express = require("express");
let app = express.Router();

// import module
//
const conveyors = require("./routes/conveyors").app;
app.use(`/conveyors`, conveyors);

const sections = require("./routes/sections").app;
app.use(`/sections`, sections);

const alert = require("./routes/alert").app;
app.use(`/alert`, alert);

//home endpoint
app.get("/", (req, res) => {
    res.end("Welcome from api_v1!")
});

module.exports = app;