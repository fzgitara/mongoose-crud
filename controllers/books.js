const mongoose = require('mongoose');
const {Book} = require('../models/books')

module.exports = {
    getAllBooks (req, res) {
        Book.find()
        .exec()
        .then(books => {
            res.status(200).json({
                message: 'List Book',
                books
            })
        })
    },
    addBook (req, res) {
        const {isbn, title, author, category, stock} = req.body
        const book = new Book()
        book.isbn = isbn
        book.title = title
        book.author = author
        book.category = category
        book.stock = stock
        book.save()
        .then(newBook => {
            res.status(201).json({
                message: 'New book added',
                newBook
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new book',
                err
            })
        })
    },
    updateBook (req, res) {
        Book.findOneAndUpdate({_id: req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Update failed'
                })
            } else {
                res.status(200).json({
                    message: 'Update successfull',
                    data: req.body
                })
            }
        })
    },
    deleteBook (req, res) {
        Book.remove({_id: req.params._id}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Delete failed'
                })
            } else {
                res.status(200).json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}