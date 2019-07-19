//Import libraries
const dotenv = require('dotenv');
const {SQLManagerSingleton} = require('../libraries/SQLManager/sqlManager');
const {PgDatabase} = require('../libraries/SQLManager/SQLdb/pgDatabase');
const {queries} = require('../queries/pgQueries');

dotenv.config();

//init postgres
function initPostgres() {
    let pg = new PgDatabase(
        {
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB_NAME,
            max: process.env.PG_POOL_MAX_CLIENT,
        },
        queries
    );

    return pg;

}

function init() {
    let sqlList = [];

    let pg = initPostgres();
    sqlList.push({name: 'conveyors', DB: pg});

    SQLManagerSingleton.initSQLManager(sqlList);
}


module.exports = {
    init,
    initPostgres
};