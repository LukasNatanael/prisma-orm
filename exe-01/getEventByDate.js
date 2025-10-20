const { pool } = require('./poolConnection')

async function getEventByDate( day ) {
    const result = await pool.query(`SELECT * FROM events WHERE events.event_date = $1;`, [day])
    
    if (result.rows.length == 0) {
        console.log('Evento não localizado! Você pode cadastra-lo ou, conferir os dados.')
        return
    }
    
    console.log(result.rows)
}

getEventByDate('2025.09.30')

exports.module = { getEventByDate }
