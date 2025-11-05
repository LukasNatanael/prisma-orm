const { Router } = require('express')
const productsController = require('./controllers/products-controller')
const costumersController = require('./controllers/costumers-controller')

const router = Router()

router.get('/products',        productsController.index )
router.get('/products/:id',    productsController.show )
router.post('/products',       productsController.create )
router.put('/products/:id',    productsController.update )
router.delete('/products/:id', productsController.delete )

router.get('/costumers',        costumersController.index )
router.get('/costumers/:id',    costumersController.show )
router.post('/costumers',       costumersController.create )
router.put('/costumers/:id',    costumersController.update )
router.delete('/costumers/:id', costumersController.delete )

module.exports = router