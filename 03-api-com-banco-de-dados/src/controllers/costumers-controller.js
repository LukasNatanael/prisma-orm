const Costumer = require("../models/Costumer")

    
const costumersController = {
    // GET /costumers
    index: async (req, res) => {
        const costumers = await Costumer.findAll()
        res.json(costumers)
    },
    
    // POST /costumers
    create: async (req, res) => {
        try {
            const newCostumer = await Costumer.create(req.body)
            res.status(201).json(newCostumer)
        }
        catch(error) {
            res.status(400).json({ message: error.message})
        }
    },
    
    // GET /costumers/:id
    show: async (req, res) => {
        const costumer = await Costumer.findById(req.params.id)
        if(!costumer) return res.status(404).json({ message: 'Costumer not found!' })
        res.json(costumer)
    },
    
    // PUT /costumers/:id
    update: async (req, res) => {
        const updatedCostumer = await Costumer.update( req.params.id, req.body )
        if(!updatedCostumer) return res.status(404).json({ message: 'Costumer not found!' })
        res.json(updatedCostumer)
    },
    
    // DELETE /costumers/:id
    delete: async (req, res) => {
        const costumer = await Costumer.delete( req.params.id )
        res.json(costumer)
    }
}

module.exports = costumersController