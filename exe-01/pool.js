const { Pool } = require('pg')

const pool = new Pool({
    connectionString: 'postgresql://lukas:admin@localhost:5432/node_postgres'
})

async function query( queryString, params, callback ) {
    // console.log(`log: query executada: ${queryString}`)
    return pool.query( queryString, params, callback )
}

module.exports = { query }
