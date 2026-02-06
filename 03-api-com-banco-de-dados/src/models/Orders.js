const query   = require("../database")
const Product = require("./Product")

class Order {
    
    constructor(orderRow, populateCostumer, populateProducts) {
        this.id         = orderRow.id
        this.customerId = orderRow.customer_id
        this.total      = +orderRow.total
        this.createdAt  = new Date(orderRow.created_at)
        this.updatedAt  = new Date(orderRow.updated_at)
    
        this.customer = populateCostumer ? populateCostumer: undefined
        this.products = populateProducts ? populateProducts: undefined
    }

    static async findAll() {
        const { rows } = query(`
            SELECT
                orders.*,
                customers.id         AS "customer.id",
                customers.name       AS "customer.name",
                customers.email      AS "customer.email",
                customers.created_at AS "customer.created_at",
                customers.updated_at AS "customer.updated_at",
            FROM orders JOIN customers ON customers.id = orders.customer_id;`
        )

        return rows.map((row) => new Order(row))
    }
    
    static async create(customerId, orderProducts) {
        const storedOrderProducts = await query(
            `SELECT * FROM products WHERE id = ANY($1::int[]);`,
            [orderProducts.map(product => product.id)]
        )

        let orderTotal = 0
        const populatedOrderProducts = storedOrderProducts.rows.map((row) => {
            const { quantity } = orderProducts.find((product) => product.id === row.id)
            orderTotal += +row.price * quantity
            return { product: new Product(row), quantity}
        })

        const dbClient = await getClient()
        let response
        
        try {
            await dbClient.query("BEGIN")

            const orderCreationResult = await dbClient.query(
                `INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING *;`,
                [customerId, orderTotal]
            )

            const order = new Order(orderCreationResult.rows[0], null, populatedOrderProducts)

            for (const entry of populatedOrderProducts) {
                await dbClient.query(
                `INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3);`,
                [order.id, entry.product.id, entry.quantity]
                )
            }

            await dbClient.query("COMMIT")
            response = order
        }
        catch (error) {
            await dbClient.query("ROLLBACK")
            response = { message: `Error while creating order: ${error.message}` }
        }
        finally {
            dbClient.release()
        }

        return response
    }
}

module.exports = Order