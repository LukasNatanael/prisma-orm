const pg = require('pg');

// Connection string: protocolo://usuario:senha@host:porta/nome_do_banco

const db = new pg.Client({
    connectionString: 'postgres://postgres:admin@localhost:5432/node_postgres'
})

async function insertPokemon(name, type) {
    await db.connect()

    // Forma básica
    // const query = `INSERT INTO "public"."Pokemon" (name, type) VALUES ('Sprigatito', 'Grass');`
    // const result1 = await db.query(query)
    // console.log(result1)


    // Dados dinâmicos da FORMA ERRADA
    // const pokemon = { name: 'Fuecoco', type: 'Fire' }
    // const result2 = await db.query(`INSERT INTO "Pokemon" ( name, type ) VALUES ('${pokemon.name}', '${pokemon.type}');`)
    // console.log(result2)
    
    // Dados dinâmicos da FORMA CORRETA
    const pokemon = { name, type }
    const result3 = await db.query(
        `INSERT INTO "Pokemon" ( name, type ) VALUES ($1, $2);`,
        [pokemon.name, pokemon.type]
    )
    
    console.log(result3)
    
    await db.end()
}

const pokemon = { name: 'Scrudle', type: 'Grass' }

insertPokemon(pokemon.name, pokemon.type)