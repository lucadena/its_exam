/**
 * These classes is util to manage Queues.
 * @author Luca De Nadai <denadai.luca99@gmail.com>
 */

const {Queue} = require("./queues/queue");

class QueueManagerSingleton {
    /**
     * Create a QueueManager and save it into singleton.
     * @param {Queue} Instance of the queue to add to singleton (or a list of Queue).
     * @return {QueueManager} Return a QueueManager instance.
     */
    static initQueueManager(queueList) {
        this.queueManager = new QueueManager(queueList);
        return this.getQueueManager();
    }

    /**
     * Save a QueueManager into singleton.
     * @param {QueueManager} The Queue manager to save.
     */
    static setQueueManager(qManager) {
        if (!QueueManager.isQueueManager(qManager))
            throw Error('The function need a QueueManager object as a parameter');
        this.queueManager = qManager;
    }

    /**
     * Return the Queue Manager saved in singleton.
     * @return {QueueManager} Return the Queue Manager instance.
     */
    static getQueueManager() {
        return this.queueManager
    }

}


class QueueManager {
    /**
     * Initialize the queue manager object.
     * @param {Queue} Instance of the queue to add to class (or a list of Queue).
     * @constructor
     */
    constructor(queueList) {
        this.queues = {};

        if(queueList)
            this.init(queueList)
    }

    /**
     * Add the Queue list.
     * @param {Queue} Instance of the queue to add to class (or a list of Queue).
     */
    init(queueList) {
        if (!Array.isArray(queueList))
            queueList = [queueList];

        for (let item of queueList)
            this.addQueue(item);
    }

    /**
     * Add to object a single Queue.
     * @param {SQLdb} Instance of the queue to add to class.
     */
    addQueue(queue) {
        if (!queue.name || !queue.queue)
            throw Error('The queue object require a name or a queue (e.g.: {name: \'\', queue: \'\'})');
        this.queues[queue.name] = new Queue(queue.queue);
    }

    /**
     * Return the list of Queue.
     * @return {SQLdb} Return all Queues.
     */
    getQueues() {
        return this.queues;
    }

    /**
     * Return the request Queue.
     * @param {string} The Queue name to search on list.
     * @return {SQLdb} Return the request Queue.
     */
    getQueue(queueName) {
        return this.queues[queueName];
    }

    /**
     * Check if a object is a queueManager instance.
     * @param {QueueManager} The DB name.
     * @return {boolean} Return true/false.
     */
    static isQueueManager(obj) {
        return obj instanceof QueueManager
    }
}

module.exports = {
    QueueManagerSingleton,
    QueueManager
};