const query = require("../database")

class Costumer {
    constructor(costumer_row) {
        this.id    = costumer_row.id
        this.name  = costumer_row.name
        this.email = costumer_row.email
        this.createdAt = new Date(costumer_row.created_at)
        this.updatedAt = new Date(costumer_row.updated_at)
    }

    static async findAll() {
        const { rows } = await query('SELECT * FROM costumers;')
        return rows.map( (row) => new Costumer(row) )
    }

    static async create({ name, email }) {
        const costumerExists = await query(`SELECT * FROM costumers WHERE email = $1;`, [email])
        if ( costumerExists.rows[0]) throw new Error('Email already in use!')

        const { rows } = await query(`
            INSERT INTO costumers
                (name, email)
            VALUES
                ($1, $2)
            RETURNING *;`, 
            [name, email]
        )
        return new Costumer(rows[0])
    }

    static async findById(id) {
        const { rows } = await query(`SELECT * FROM costumers WHERE id = $1;`, [id])
        if (!rows[0]) return null
        
        return new Costumer( rows[0] )
    }

    static async update(id, attributes) {
        const { rows } = await query('SELECT * FROM costumers WHERE id = $1;', [id])
        if (!rows[0]) return null
    
        const costumer = new Costumer(rows[0])
        Object.assign(costumer, attributes)

        costumer.updatedAt = new Date()

        await query(`
            UPDATE costumers SET
                name  = $1,
                email = $2,
                updated_at = $3
            WHERE id = $4;`,
            [ costumer.name, costumer.email, costumer.updatedAt, costumer.id ]
        )

        return costumer
    }

    static async delete(id) {
        const { rows } = await query('SELECT * FROM costumers WHERE id = $1;', [id])
        if (!rows[0]) return { message: 'Costumer not found.' }

        await query('DELETE FROM costumers WHERE id = $1 RETURNING *;', [id])
        return rows

    }
}

module.exports = Costumer