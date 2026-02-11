const Order = require("../models/Order");

const ordersController = {
    // GET /orders
    index: async (req, res) => {
        const orders = await Order.findAll()
        res.json(orders)
    },
    
    // POST /orders
    create: async (req, res) => {
        const order = await Order.create(
            req.body.customerId,
            req.body.products // Array<{ id: number, quantity: number }>
        )
        
        if (order instanceof Order) {
            res.status(201).json(order)
        } else {
            res.status(400).json(order)
        }
        
    },

    // GET /orders:id
    show: async (req, res) => {
        const order = await Order.findById(req.params.id)
        res.json(order)
    },
    
    // DELETE /orders/:id
    delete: async (req, res) => {
        const order = await Order.delete( req.params.id )
        if(!order) return res.status(404).json({ message: 'Order not found!' })
        res.json(order)
    }
}

module.exports = ordersController