const {SQLManagerSingleton} = require('../../libraries/SQLManager/sqlManager');
const {QueueManagerSingleton} = require('../../libraries/queueManager/queueManager');

function getConveyorsBySection(sectionId) {

    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('getConveyorsBySection', {
            sectionId: sectionId
        }).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });

}

function getConveyorsStatus(conveyorId) {

    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('getConveyorState', {
            conveyorId: conveyorId
        }).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });

}

function getSections() {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('getSections').then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}


function setSpeed(conveyorId, data) {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('insertSpeed', {conveyorId: conveyorId, data: data}).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}

function setConsumption(conveyorId, data) {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('insertConsumption', {conveyorId: conveyorId, data: data}).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}

function sendToQueue(type, data) {
    return new Promise(async (resolve, reject) => {
        let queue = QueueManagerSingleton.getQueueManager().getQueue('conveyors').queue;
        queue.send(
            {
                message: {type: type, data: data},
                groupId: 'sensor_data'
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            });
    });
}

function setAlert(data) {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('insertAlert', {
            message: data.message,
            timestamp: data.timestamp,
            type: data.type,
            measure_id: data.measure_id,
            conveyors_id: data.conveyors_id
        }).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}


function getAlerts() {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('getAlerts').then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}


function readAlert(id) {
    return new Promise((resolve, reject) => {
        let sql = SQLManagerSingleton.getSQLManager().getDB('conveyors');
        sql.query('readAlert', {id}).then((data) => {
            resolve(data.rows);
        }).catch((err) => {
            reject(err)
        })
    });
}

module.exports = {
    getConveyorsBySection,
    getConveyorsStatus,
    getSections,
    setSpeed,
    sendToQueue,
    setConsumption,
    setAlert,
    getAlerts,
    readAlert
};