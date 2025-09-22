const { Pool } = require('pg')

const pool = new Pool({
    connectionString: 'postgresql://lukas:admin@localhost:5432/node_postgres',
    max: 2
})

async function queryRapida() {
    const result = await pool.query(' SELECT 1 + 1 as soma; ')
    console.log(result.rows[0])

    setTimeout( () => {
        console.log('Fechando conexão...')
    }, 3000)
}

queryRapida()
queryRapida()
queryRapida()