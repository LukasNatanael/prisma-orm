const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgresql://lukas:admin@localhost:5432/node_postgres'
})

async function openConection() {
    await client.connect()

    const result = await client.query(' SELECT 1 + 1 AS resultado; ')
    console.log(result.rows)

    setTimeout( () => {
        client.end()
        console.log('Fechando conexão...')
    }, 2000)
}

openConection()

openConection()