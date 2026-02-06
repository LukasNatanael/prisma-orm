const query = require("../database")

class Customer {
    constructor(costumer_row) {
        this.id    = costumer_row.id
        this.name  = costumer_row.name
        this.email = costumer_row.email
        this.createdAt = new Date(costumer_row.created_at)
        this.updatedAt = new Date(costumer_row.updated_at)
    }

    static async findAll() {
        const { rows } = await query('SELECT * FROM customers;')
        return rows.map( (row) => new Customer(row) )
    }

    static async create({ name, email }) {
        const costumerExists = await query(`SELECT * FROM customers WHERE email = $1;`, [email])
        if ( costumerExists.rows[0]) throw new Error('Email already in use!')

        const { rows } = await query(`
            INSERT INTO customers
                (name, email)
            VALUES
                ($1, $2)
            RETURNING *;`, 
            [name, email]
        )
        return new Customer(rows[0])
    }

    static async findById(id) {
        const { rows } = await query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if (!rows[0]) return null
        
        return new Customer( rows[0] )
    }

    static async update(id, attributes) {
        const { rows } = await query('SELECT * FROM customers WHERE id = $1;', [id])
        if (!rows[0]) return null
    
        const costumer = new Customer(rows[0])
        Object.assign(costumer, attributes)

        costumer.updatedAt = new Date()

        await query(`
            UPDATE customers SET
                name  = $1,
                email = $2,
                updated_at = $3
            WHERE id = $4;`,
            [ costumer.name, costumer.email, costumer.updatedAt, costumer.id ]
        )

        return costumer
    }

    static async delete(id) {
        const { rows } = await query('SELECT * FROM customers WHERE id = $1;', [id])
        if (!rows[0]) return null

        await query('DELETE FROM customers WHERE id = $1 RETURNING *;', [id])
        return new Customer(rows[0])

    }
}

module.exports = Customer