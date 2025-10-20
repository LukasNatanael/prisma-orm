const { getAllEvents, getEventByName, getEventsByDate, createEvent, sellTicket } = require("./functions")

async function tests() {
    // const new_event = await createEvent( 'Ano novo', new Date('2026-01-01'), 500 )
    // console.log(new_event)
    
    await sellTicket(9, 400)
    
    const current_event = await getEventsByDate( new Date('2026-01-01') )
    console.log(current_event)
    
    const events = await getAllEvents()
    console.log(events)
    
    process.exit(0)
}

tests()