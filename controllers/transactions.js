const mongoose = require('mongoose');
const {Transaction} = require('../models/transactions')

module.exports = {
    getAllTransactions (req, res) {
        Transaction.find()
        .populate('member')
        .populate('booklist')
        .exec()
        .then(transactions => {
            res.status(200).json({
                message: 'List transasction',
                transactions
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },
    addTransaction (req, res) {
        const {member, days, out_date, due_date, in_date, fine, booklist} = req.body
        const transaction = new Transaction()
        transaction.member = member
        transaction.days = days
        transaction.out_date = new Date()
        transaction.due_date = new Date().setDate(transaction.out_date.getDate()+transaction.days)
        transaction.in_date = in_date
        transaction.fine = Math.ceil((transaction.in_date - transaction.due_date)/(1000*3600*24)) * 1000
        transaction.booklist = booklist
        transaction.save()
        .then(newTransaction => {
            res.status(201).json({
                message: 'New transaction added',
                newTransaction
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new transaction',
                err
            })
        })
    },
    updateTransaction (req, res) {
        Transaction.findOneAndUpdate({_id: req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
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
    deleteTransaction (req, res) {
        Transaction.remove({_id: req.params._id}, (err, r) => {
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