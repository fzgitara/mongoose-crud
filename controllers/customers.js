const mongoose = require('mongoose');
const {Customer} = require('../models/customers')

module.exports = {
    getAllCustomers (req, res) {
        Customer.find()
        .exec()
        .then(customers => {
            res.status(200).json({
                message: 'List Customer',
                customers
            })
        })
    },
    addCustomer (req, res) {
        const {name, memberid, address, zipcode, phone} = req.body
        const customer = new Customer()
        customer.name = name
        customer.memberid = memberid
        customer.address = address
        customer.zipcode = zipcode
        customer.phone = phone
        customer.save()
        .then(newCustomer => {
            res.status(201).json({
                message: 'New customer added',
                newCustomer
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new customer',
                err
            })
        })
    },
    updateCustomer (req, res) {
        Customer.findOneAndUpdate({_id: req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
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
    deleteCustomer (req, res) {
        Customer.remove({_id: req.params._id}, (err, r) => {
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