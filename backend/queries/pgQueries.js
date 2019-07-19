
const queries = {
    getSections: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            select *
            from public.section order by id
        `);
        client.release();
        return res;
    },
    getConveyorsBySection: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            SELECT c.*
            FROM public.conveyors as c, public."section" as s
            WHERE c.section_id = s.id and s.id = $1
        `, [params.sectionId]);
        client.release();
        return res;
    },
    getConveyorState: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            SELECT s.value as speed, s."timestamp" as speed_date, c.value as consumption, c."timestamp" as consumption_date
            FROM public.conveyors as conv, public.speed as s, public.consumption as c
            where conv.id = $1 
                and s.id = (select sp.id from speed as sp where sp.conveyors_id = conv.id order by sp.id desc limit 1)
                and c.id = (select co.id from consumption as co where co.conveyors_id = conv.id order by co.id desc limit 1)

        `, [params.conveyorId]);
        client.release();
        return res;
    },
    insertSpeed: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            INSERT INTO public.speed
            (value, "timestamp", conveyors_id)
            VALUES($1, $2, $3) returning *;
        `, [params.data.value, params.data.timestamp, params.conveyorId]);
        client.release();
        return res;
    },
    insertConsumption: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            INSERT INTO public.consumption
            (value, "timestamp", conveyors_id)
            VALUES($1, $2, $3) returning *;
        `, [params.data.value, params.data.timestamp, params.conveyorId]);
        client.release();
        return res;
    },
    insertAlert: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            INSERT INTO public.alert
            (message, "timestamp", "type", measure_id, conveyors_id)
            VALUES($1, $2, $3, $4, $5) returning *;
        `, [params.message, params.timestamp, params.type, params.measure_id, params.conveyors_id]);
        client.release();
        return res;
    },
    getAlerts: async function () {
        const client = await this.pool.connect();
        let res = await client.query(`
            SELECT * FROM public.alert as a where a.read = false;
        `);
        client.release();
        return res;
    },
    readAlert: async function (params) {
        const client = await this.pool.connect();
        let res = await client.query(`
            UPDATE public.alert
            SET "read"=true
            WHERE id=$1 returning *;
        `, [params.id]);
        client.release();
        return res;
    },
};

module.exports.queries = queries;