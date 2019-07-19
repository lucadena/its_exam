const AWS = require('aws-sdk');

defaultInitParams = {
    queueUrl: '',
    apiVersion: 'v1',
    awsConfig: {
        region: '',
        accessKeyId: '',
        secretAccessKey: ''
    }
};

defaultSendParams = {
    MessageGroupId: '',
    MessageBody: '',
    QueueUrl: '',
};

defaultReceiveParams = {
    MaxNumberOfMessages: 5,
    VisibilityTimeout: 20
};

defaultDeleteParams = {
    QueueUrl: '',
    ReceiptHandle: '',
};

class SqsAwsQueue {
    /**
     * Initialize the Queue Object.
     * @param {Object} Options of the Queue READ AWS DOCS {queueUrl: '', awsConfig: {}, sendParams?: {}, receiveParams?: {}, deleteParams?: {}}.
     * @constructor
     */
    constructor(options) {

        //check if require configuration are configured
        if (!options)
            throw Error('The constructor need options');

        if (!options.queueUrl)
            throw Error('Missing "queueUrl" on options params');

        if (!options.awsConfig)
            throw Error('Missing "awsConfig" on options params');

        //Set queue url
        this.queueUrl = options.queueUrl;

        //set aws credential
        AWS.config.update(options.awsConfig);

        //set aws.sqs configuration
        this.sqs = new AWS.SQS({
            apiVersion: options.apiVersion
                ? options.apiVersion
                : 'v1',
            ...options.awsSqsConfig
        });

        //set send params
        this.sendParams = options.sendParams ?options.sendParams :{};

        //set receive params
        this.receiveParams = options.receiveParams ?options.receiveParams :defaultReceiveParams;

        //set delete params
        this.deleteParams = options.deleteParams ?options.deleteParams :{};

    }

    /**
     * Return the queue instance.
     * @return {Object}.
     */
    send(data) {

        const {message, groupId} = data;

        if (!message)
            throw Error('Missing "message" param');

        if (!groupId)
            throw Error('Missing "groupId" param');

        let insMessage = JSON.stringify(message);

        const params = {
            MessageGroupId: groupId,
            MessageBody: insMessage,
            QueueUrl: this.queueUrl,
            ...this.sendParams
        };

        return new Promise((resolve, reject) => {
            this.sqs.sendMessage(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Receive data from queue
     * @return {Promise}.
     */
    receive() {
        let params = {
            QueueUrl: this.queueUrl,
            ...this.receiveParams,
        };

        return new Promise((resolve, reject) => {
            this.sqs.receiveMessage(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Delete data on queue.
     * @param {Object} Data to delete.
     * @return {Promise}.
     */
    delete(message) {
        return new Promise(async (resolve, reject) => {
            if(Array.isArray(message.Messages)){
                this.deleteList(message.Messages)
                    .then((res)=>resolve(res))
                    .catch((err)=>reject(err));
            } else {
                this.deleteSingle(message)
                    .then((res)=>resolve(res))
                    .catch((err)=>reject(err));
            }
        });

    }

    /**
     * Delete a list of message on queue.
     * @param {Object} List of Data to delete.
     * @return {Promise}.
     */
    deleteList(messages){
        return new Promise(async (resolve, reject) => {
            for(let item of messages){
                await this.deleteSingle(item).catch(err=>reject(err));
            }
            resolve()
        });
    }

    /**
     * Delete a single message on queue.
     * @param {Object} Data to delete.
     * @return {Promise}.
     */
    deleteSingle(message){

        return new Promise((resolve, reject) => {

            if(!message.ReceiptHandle)
                throw Error('Missing ReceiptHandle');

            let deleteParams = {
                QueueUrl: this.queueUrl,
                ReceiptHandle: message.ReceiptHandle,
                ...this.deleteParams
            };

            this.sqs.deleteMessage(deleteParams, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    /**
     * Receive and delete data on queue.
     * @return {Promise}.
     */
    receive_delete() {

        return new Promise(async (resolve, reject) => {

            let messages = [];

            await this.receive()
                .then((res) => {
                    messages = res.Messages;
                }).catch((err) => {
                    reject(err);
                });

            if (messages.length === 0) {
                reject(Error("There aren't messages in queue"));
            }



            for (let message of messages) {
                await this.delete(message)
                    .catch((err) => {
                        reject(err);
                    })
            }

            resolve(messages);

        });
    }
}

module.exports = {
    defaultInitParams,
    defaultSendParams,
    defaultReceiveParams,
    defaultDeleteParams,
    SqsAwsQueue
};