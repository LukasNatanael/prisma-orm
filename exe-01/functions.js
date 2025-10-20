const { query } = require('./pool')

async function createEvent(  name, event_date, total_tickets=0, selled_tickets=0) {
    
    if ( typeof total_tickets === 'number' && total_tickets > 0 ) {
        const rows = await query(`
            INSERT INTO events
            ( name, event_date, total_tickets, selled_tickets )
            VALUES ( $1, $2, $3, $4 );
            `, [ name, event_date, total_tickets, selled_tickets ])
            
        return rows
    }
    else {
        throw new Error('Total tickets must be greater than 0.')
    }


}

async function getAllEvents() {
    const { rows } = await query(' SELECT * FROM events; ')

    return rows
}

async function getEventByName( name ) {
    const { rows } = await query(`SELECT * FROM events WHERE events.name = $1;`, [ name ])
    
    if (!rows) {
        throw new Error('Evento não localizado! Você pode cadastra-lo ou, conferir os dados.')
    }
    
    return rows
}

async function getEventsByDate( event_date ) {
    const { rows } = await query(`SELECT * FROM events WHERE event_date = $1;`, [event_date])
    
    if (!rows) {
        throw new Error('Evento não localizado! Você pode cadastra-lo ou, conferir os dados.')
    }
    
    return rows
}

async function sellTicket( event_id, quantity=1 ) {
    const today = new Date()
    
    if (typeof quantity == 'string') {
        throw new Error('A quantidade de ingressos deve ser do tipo inteiro!')
    }
    
    const { rows } = await query(`SELECT * FROM events WHERE events.id = $1;`, [event_id])
    
    if ( rows.length == 0) {
        throw new Error('Evento não localizado! Você pode cadastra-lo ou, conferir os dados.')
    }

    const event = {
        id:             rows[0].id,
        date:           rows[0].event_date,
        selled_tickets: rows[0].selled_tickets,
        total_tickets:  rows[0].total_tickets,
    }
    
    if (today > event.date) {
        throw new Error('Evento já finalizado!')
    }

    else if (event.total_tickets <= 0 ) {
        throw new Error('Ingressos esgotados!')
    }
    else if (event.total_tickets <= quantity ) {
        throw new Error('Quantidade de ingressos solicitados maior que a quantidade disponível!')
    }

    else if (event.selled_tickets >= event.total_tickets ) {
        throw new Error('Ingressos esgotados!')
    }
    
    await query(`
        UPDATE events 
        SET selled_tickets = selled_tickets + $1
        WHERE id = $2`, 
        [quantity, event.id]
    )
    
    console.log(rows[0])
    
}

module.exports = { createEvent, getAllEvents,getEventByName, getEventsByDate, sellTicket }
