const express = require("express");
const conveyorsService = require('../services/conveyorsService');

let app = express.Router();

app.get("/", (req, res) => {
    conveyorsService.getSections()
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })

});

module.exports.app = app;