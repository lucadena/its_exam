/**
 * This implement and manage a connection with PostgreSQL.
 * @author Luca De Nadai <denadai.luca99@gmail.com>
 */

const { Pool } = require('pg');

class PgDatabase {

    /**
     * Initialize the Pool connection with Postgres.
     * @param {Object} The params to configure a connection with Postgres (Read PG documentation).
     * @param {Object} The object that contains the queries for Postgres.
     * @constructor
     */
    constructor(config, query){

        if(!config){
            throw Error("You must insert the DB configuration")
        }

        if(!query){
            throw Error("You must insert the query file")
        }

        this.config = config;
        this.queries = query;

        try{
            this.pool = new Pool({
                ...config
            });

        }catch (e) {
            throw e;
        }

    }

    /**
     * Return the connection of DB.
     * @return {Pool} the db connection of pool.
     */
    connect(){
         return this.pool.connect();
    }

    /**
     * Return the list of queries saved in the DB object.
     * @return {Object} Return the list of queries.
     */
    getQueries(){
        return this.queries;
    }

    /**
     * This method execute a query from the queries list.
     * @param {String} Query name.
     * @param {Object} Params of query.
     * @return {Object} Return the result of query.
     */
    query(queryName, params){
        let query = this.queries[queryName];

        if(!query){
            throw Error("The query doesn't exists")
        }

        return query.bind({pool: this.pool})(params);

    }
}

module.exports = {
    PgDatabase
};