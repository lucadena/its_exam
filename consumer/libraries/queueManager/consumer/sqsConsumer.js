const {Queue} = require("../queues/queue");
let queue = {};

let events = {
    receive: (data)=>{console.log("receive: ", data)},
    delete: (data)=>{console.log("delete: ", data)},
    error: (err)=>{console.error("error: ", err)},
};

/**
 * Set event.
 * @param {String} Event (receive, delete, error).
 */
function on(event, cb){
    events[event] = cb;
}

/**
 * Scheduler that download repeatedly data from queue.
 * @param {Queue} Insert_Queue queue to manage.
 * @param {Object} Options {receive: true/false, delete: true/false}.
 * @return {Promise}.
 */
async function scheduler(insert_queue, options) {

    queue = new Queue(insert_queue);

    while (true) {
        if (options.receive) {
            var message = {};
            await queue.receive()
                .then((data) => {
                    message = data;
                    events['receive'](data) ? events['receive'](data) : null;
                })
                .catch(events['error'] ? events['error'] : null);
        }

        if (options.delete && message) {
            if(message.Messages){
                for(let m of message.Messages){
                    console.log(m)
                    if(m.ReceiptHandle){
                        await queue.delete(m)
                            .then(events['delete'] ? events['delete'] : null)
                            .catch(events['error'] ? events['error'] : null)
                    }

                }
            }

        }
    }
}

/**
 * Init and start the scheduler.
 * @param {Queue} Insert_Queue queue to manage.
 * @param {Object} Options {receive: true/false, delete: true/false}.
 * @return {Promise}.
 */
function start(insert_queue, options) {
    scheduler(insert_queue, options);
}

module.exports = {
    start,
    scheduler,
    on
};