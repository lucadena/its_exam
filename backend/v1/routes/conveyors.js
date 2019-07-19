const express = require("express");
const conveyorsService = require('../services/conveyorsService');

let app = express.Router();



app.get("/:sectionId/", (req, res) => {
    let id = req.params['sectionId'];
    conveyorsService.getConveyorsBySection(id)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })

});

app.get("/state/:conveyorsId/", (req, res) => {
    let id = req.params['conveyorsId'];
    conveyorsService.getConveyorsStatus(id)
        .then((data) => {
            console.log(data[0]);
            res.json(data[0]);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })

});

app.post("/:conveyorsId/speed/", (req, res) => {
    let id = req.params['conveyorsId'];
    let body = req.body;

    conveyorsService.sendToQueue('speed', {conveyorsId: id, data: body})
        .then((data)=>res.json({OK: 'insert'}))
        .catch((err)=>{
            console.log(err)
            res.json({error: 'Error sending data'})})


    // conveyorsService.setSpeed(id, body)
    //     .then((data) => {
    //         console.log(data[0]);
    //         res.json(data[0]);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.json(err);
    //     })

});

app.post("/:conveyorsId/consumption/", (req, res) => {
    let id = req.params['conveyorsId'];
    let body = req.body;

    conveyorsService.sendToQueue('consumption', {conveyorsId: id, data: body})
        .then((data)=>res.json({OK: 'insert'}))
        .catch((err)=>{
            console.log(err)
            res.json({error: 'Error sending data'})})

    // conveyorsService.setConsumption(id, body)
    //     .then((data) => {
    //         console.log(data[0]);
    //         res.json(data[0]);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.json(err);
    //     })

});


module.exports.app = app;