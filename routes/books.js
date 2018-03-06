const express = require('express');
const router = express.Router();
const {getAllBooks, addBook, updateBook, deleteBook} = require('../controllers/books')

/* GET users listing. */
router.get('/', getAllBooks)
router.post('/', addBook)
router.put('/:_id', updateBook)
router.delete('/:_id', deleteBook)

module.exports = router;
