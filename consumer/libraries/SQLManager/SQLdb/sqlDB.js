/**
 * This class simulate a sort of Interface of SQL DB classes.
 * @author Luca De Nadai <denadai.luca99@gmail.com>
 */

class SQLdb {

    /**
     * Initialize the SQLdb Object.
     * @param {Object} Instance of the db (Postgres, MySQL, ....).
     * @constructor
     */
    constructor(db){
        this.db = db;
    }

    /**
     * Return the db instance.
     * @return {Object}.
     */
    getInstance(){
        return this.db;
    }

    /**
     * Return the connection of DB.
     * @return {Object} the db connection.
     */
    connect(){
        return this.db.connect();
    }

    /**
     * Return the list of queries saved in the DB object.
     * @return {Object} Return the list of queries.
     */
    getQueries(){
        return this.db.getQueries();
    }

    /**
     * This method execute a query from the queries list.
     * @param {String} Query name.
     * @param {Object} Params of query.
     * @return {Object} Return the result of query.
     */
    query(queryName, params){
        return this.db.query(queryName, params);
    }

}

module.exports = {
    SQLdb
};