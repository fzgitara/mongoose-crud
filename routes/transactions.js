const express = require('express');
const router = express.Router();
const {getAllTransactions, addTransaction, updateTransaction, deleteTransaction} = require('../controllers/transactions')

/* GET users listing. */
router.get('/', getAllTransactions)
router.post('/', addTransaction)
router.put('/:_id', updateTransaction)
router.delete('/:_id', deleteTransaction)

module.exports = router;
