const { Router } = require('express')
const productsController = require('./controllers/products-controller')
const customersController = require('./controllers/customers-controller')

const router = Router()

router.get('/products',        productsController.index )
router.post('/products',       productsController.create )
router.get('/products/:id',    productsController.show )
router.put('/products/:id',    productsController.update )
router.delete('/products/:id', productsController.delete )

router.get('/customers',        customersController.index )
router.post('/customers',       customersController.create )
router.get('/customers/:id',    customersController.show )
router.put('/customers/:id',    customersController.update )
router.delete('/customers/:id', customersController.delete )

module.exports = router