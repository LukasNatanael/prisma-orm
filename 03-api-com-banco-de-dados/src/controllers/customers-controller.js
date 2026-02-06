const Customer = require("../models/Customer")

    
const customerController = {
    // GET /customer
    index: async (req, res) => {
        const customer = await Customer.findAll()
        res.json(customer)
    },
    
    // POST /customer
    create: async (req, res) => {
        try {
            const newCustomer = await Customer.create(req.body)
            res.status(201).json(newCustomer)
        }
        catch(error) {
            res.status(400).json({ message: error.message})
        }
    },
    
    // GET /customer/:id
    show: async (req, res) => {
        const customer = await Customer.findById(req.params.id)
        if(!customer) return res.status(404).json({ message: 'Customer not found!' })
        res.json(customer)
    },
    
    // PUT /customer/:id
    update: async (req, res) => {
        const updatedCustomer = await Customer.update( req.params.id, req.body )
        if(!updatedCustomer) return res.status(404).json({ message: 'Customer not found!' })
        res.json(updatedCustomer)
    },
    
    // DELETE /customer/:id
    delete: async (req, res) => {
        const deletedCustomer = await Customer.delete( req.params.id )
        if(!deletedCustomer) return res.status(404).json({ message: 'Customer not found!' })
        res.json({message: `Customer deleted successfully!`, deletedCustomer})
    }
}

module.exports = customerController