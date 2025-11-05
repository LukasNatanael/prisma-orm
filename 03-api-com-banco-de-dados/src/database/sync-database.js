const query = require(".");

async function syncDatabase() {
    await query(`
        CREATE TABLE IF NOT EXISTS products (
            id             SERIAL PRIMARY KEY,
            name           VARCHAR(255) NOT NULL,
            description    TEXT,
            price          DECIMAL(10, 2) NOT NULL,
            stock_quantity INT NOT NULL,
            created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active      BOOLEAN DEFAULT TRUE
        );`
    )

    await query(`
        CREATE TABLE IF NOT EXISTS costumers (
            id             SERIAL PRIMARY KEY,
            name           VARCHAR(255) NOT NULL,
            email          VARCHAR(255) NOT NULL UNIQUE,
            created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    )
    
    console.log('Created "products" table.')
    console.log('Created "costumers" table.')
    process.exit(1)
}

syncDatabase()