const { query } = require('./pool')

async function createTable() {

    await query(` 
        CREATE TABLE IF NOT EXISTS events (
            id             SERIAL PRIMARY KEY,
            name           VARCHAR(50) NOT NULL,
            event_date     DATE NOT NULL,
            total_tickets  INT DEFAULT 0,
            selled_tickets INT DEFAULT 0
        );
    `)    

    console.log('Events table created suceessfully!')
    process.exit(0)
    
}

createTable()

exports.module = { createTable }
