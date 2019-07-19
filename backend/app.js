//Import libraries
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sqlDB = require('./startup/initSQLdb');
const queue = require('./startup/initQueue');

dotenv.config();

//init server
const pathPrefix = process.env.PATH_PREFIX;
const serverPort = process.env.PORT;
const appTitle = process.env.APP_WELCOME_TITLE;

let app = express();

app.use(cors());
app.use(bodyParser.json());

//init queue
queue.init();

//init SQL DATABASES
sqlDB.init();


// Import api version module
const ap1_v1 = require("./v1");
app.use(`/${pathPrefix}/v1`, ap1_v1);


//home endpoint
app.get(`/${pathPrefix}/`, (req, res) => {
    res.end(`${appTitle}`);
});

app.listen(serverPort, () => {
    console.log(`App running on localhost:${serverPort}/${pathPrefix}/`);
});


//Terminate process
process.on('SIGUSR2', () => {
    process.exit(0);
});
process.on('uncaughtException', () => {
    process.exit(0);
});
process.on('exit', () => {
    process.exit(0);
});