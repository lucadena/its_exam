//Import libraries
const dotenv = require('dotenv');
const {QueueManagerSingleton} = require('../libraries/queueManager/queueManager');
const {SqsAwsQueue} = require('../libraries/queueManager/queues/sqsAwsQueue');

dotenv.config();

function initSQS(){
    //init queue
    let sqs = new SqsAwsQueue({
        queueUrl: process.env.AWS_QUEUE_URL,
        awsConfig: {
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });

    return sqs;

}

function init(){
    let queueList = [];

    const sqs = initSQS();
    queueList.push({name: 'conveyors', queue: sqs});

    QueueManagerSingleton.initQueueManager(queueList);

}

module.exports = {
    init,
    initSQS
};