//Import libraries
const sqlDB = require('./startup/initSQLdb');
const dotenv = require('dotenv');

const SQSaws = require('./libraries/queueManager/queues/sqsAwsQueue').SqsAwsQueue;
const SQSConsumer = require('./libraries/queueManager/consumer/sqsConsumer');

const conveyorsService = require('./services/conveyorsService');

dotenv.config();


//init SQL DATABASES
sqlDB.init();


//configure SocketIO
const io = require('socket.io')(3000);

io.on('connection', function(socket){
    console.log('a user connected');
});

function sendToClient(title, data){
    io.sockets.emit(title, JSON.stringify(data));
}

//init queue
let sqs = new SQSaws({
    queueUrl: process.env.AWS_QUEUE_URL,
    awsConfig: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

SQSConsumer.on('receive', (data)=>{

    let messages = data.Messages ?data.Messages :null;

    if(messages){
        for(let message of messages){
            let body = JSON.parse(message.Body);
            if(body.type === 'speed'){
                conveyorsService.setSpeed(body.data.conveyorsId, body.data.data)
                    .then((res)=>{
                        console.log("Insert: ", res[0]);
                        if(res[0].value > 50){
                            //alert
                            conveyorsService.setAlert({
                                message: 'Speed high',
                                timestamp: res[0].timestamp,
                                type: 'speed',
                                measure_id: res[0].id,
                                conveyors_id: res[0].conveyors_id
                            }).then((alert)=>{
                                console.log('insert')
                                sendToClient('alert', alert[0]);
                            })
                        }
                    })
                    .catch((err)=>console.error(err))

            } else if(body.type === 'consumption'){
                conveyorsService.setConsumption(body.data.conveyorsId, body.data.data)
                    .then((res)=>{
                        console.log("Insert: ", res[0]);
                        if(res[0].value > 40){
                            //alert
                            conveyorsService.setAlert({
                                message: 'Consume high',
                                timestamp: res[0].timestamp,
                                type: 'consumption',
                                measure_id: res[0].id,
                                conveyors_id: res[0].conveyors_id
                            }).then((alert)=>{
                                sendToClient('alert', alert[0]);
                            })
                        }
                    })
                    .catch((err)=>console.error(err))
            }

            sendToClient(`conveyor-${body.data.conveyorsId}`,body)
        }
    }
});

SQSConsumer.on('delete', (data)=>{
    // console.log("delete: ", data)
});

SQSConsumer.start(sqs, {receive: true, delete: true});
