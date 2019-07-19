/**
 * These classes is util to manage SQL databases.
 * @author Luca De Nadai <denadai.luca99@gmail.com>
 */


const {SQLdb} = require('./SQLdb/sqlDB');

class SQLManagerSingleton {
    /**
     * Create a SQL Manager and save it into singleton.
     * @param {SQLdb} Instance of the db to add to singleton (or a list of DB).
     * @return {SQLManager} Return the SQL Manager instance.
     */
    static initSQLManager(dbList) {
        this.sqlManager = new SQLManager(dbList);
        return this.sqlManager;
    }

    /**
     * Save a SQL Manager into singleton.
     * @param {SQLManager} The SQL manager to add.
     */
    static setSQLManager(sqlManager) {
        if (!SQLManager.isSQLManager(sqlManager))
            throw Error('The function need a SQLManager object as a parameter');
        this.sqlManager = sqlManager;
    }

    /**
     * Return a SQL Manager.
     * @return {SQLManager} Return the SQL Manager instance.
     */
    static getSQLManager() {
        return this.sqlManager;
    }

}


class SQLManager {
    /**
     * Initialize the SQL manager Object.
     * @param {SQLdb} Instance of the db to add to class (or a list of DB).
     * @constructor
     */
    constructor(dbList) {
        this.DBs = [];
        if(dbList)
            this.init(dbList)
    }

    /**
     * Add to object the DB list.
     * @param {SQLdb} Instance of the db to add to class (or a list of DB).
     */
    init(dbList) {
        if (!Array.isArray(dbList))
            dbList = [dbList];

        for (let item of dbList)
            this.addDB(item);
    }

    /**
     * Add to object a single DB.
     * @param {SQLdb} Instance of the db to add to class.
     */
    addDB(DB) {
        if (!DB.name || !DB.DB)
            throw Error('The DB object require a name or a DB (e.g.: {name: \'\', DB: \'\'})');

        this.DBs[DB.name] = new SQLdb(DB.DB);
    }

    /**
     * Return the list of DB.
     * @return {SQLdb} Return all DB.
     */
    getDBs() {
        return this.DBs;
    }

    /**
     * Return the request DB.
     * @param {string} The DB name.
     * @return {SQLdb} Return the request DB.
     */
    getDB(DB) {
        return this.DBs[DB];
    }

    /**
     * Check if a object is a SQLManager instance.
     * @param {SQLManager} The DB name.
     * @return {boolean} Return true/false.
     */
    static isSQLManager(obj) {
        return obj instanceof SQLManager
    }
}

module.exports = {
    SQLManagerSingleton,
    SQLManager
};