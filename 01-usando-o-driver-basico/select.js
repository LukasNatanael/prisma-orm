const pg = require('pg');

// Connection string: protocolo://usuario:senha@host:porta/nome_do_banco

const db = new pg.Client({
    connectionString: 'postgres://postgres:admin@localhost:5432/node_postgres'
})

async function selectAllPokemons() {
    await db.connect()

    const query = `SELECT * FROM "public"."Pokemon";`
    
    const result = await db.query(query)
    console.table(result.rows)

    await db.end()
}

async function selectPokemon(name) {
    await db.connect()

    pokemon = { name }
    const query = [`SELECT * FROM "public"."Pokemon" WHERE name = $1;`, [ pokemon.name ]]
    
    const result = await db.query(...query)
    console.table(result.rows)

    await db.end()
}

// selectAllPokemons()
selectPokemon('Squirtle')