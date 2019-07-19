const axios = require('axios');

apiURL = 'http://localhost:8080/api/v1';

conveyors = [
    1, 2, 3, 5
];

function insertData(id, type, data) {
    axios.post(`${apiURL}/conveyors/${id}/${type}`, data)
        .then((res) => {
            console.log(`conveyors ${id},\n DATA  ${JSON.stringify(data)}`);
        })
        .catch((err) => {
            console.error(err);
        })
}

// generateGps(1, 1, {x: 150, y: 0});

function setTimer() {
    for (let c of conveyors) {

        setInterval(() => {

            let min = 0;
            let max = 60;
            let value = Math.floor(Math.random() * (+max - +min)) + +min;
            insertData(c, 'speed', {value: value, timestamp: new Date()})
        }, 30000)

        setInterval(() => {
            let min = 0;
            let max = 80;
            let value = Math.floor(Math.random() * (+max - +min)) + +min;
            insertData(c, 'consumption', {value: value, timestamp: new Date()})
        }, 20000)

    }
}

setTimer();