const express = require('express');
const router = express.Router();
const {getAllCustomers, addCustomer, updateCustomer, deleteCustomer} = require('../controllers/customers')

/* GET users listing. */
router.get('/', getAllCustomers)
router.post('/', addCustomer)
router.put('/:_id', updateCustomer)
router.delete('/:_id', deleteCustomer)

module.exports = router;
