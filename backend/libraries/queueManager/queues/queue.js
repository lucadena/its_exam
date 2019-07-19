/**
 * This class simulate a sort of Interface of Queue classes.
 * @author Luca De Nadai <denadai.luca99@gmail.com>
 */

class Queue {
    /**
     * Initialize the Queue Object.
     * @param {Object} Instance of the Queue (SQS, Rabbit, ....).
     * @constructor
     */
    constructor(queue) {
        this.queue = queue;
    }

    /**
     * Return the queue instance.
     * @return {Object}.
     */
    getQueue(){
        return this.queue;
    }

    /**
     * Push data to queue.
     * @param {Object} Data to insert.
     * @return {Promise}.
     */
    send(data) {
        return this.queue.send(data);
    }

    /**
     * Receive data from queue
     * @return {Promise}.
     */
    receive() {
        return this.queue.receive();
    }

    /**
     * Delete data on queue.
     * @param {Object} Data to delete.
     * @return {Promise}.
     */
    delete(data) {
        return this.queue.delete(data);
    }

    /**
     * Receive and delete data on queue.
     * @return {Promise}.
     */
    receive_delete() {
        return this.queue.receive_delete();
    }
}

module.exports = {
    Queue
};