const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/order');

router.get('/', function (req, res, next) {
    Order.find()
        .select('product quantity _id')
        .exec()
        .then(docs=>{
            res.status(200).json(docs)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
});

router.post('/', function (req, res, next) {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quality: req.body.quality,
        product: req.body.productId
    })
    order.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

});

router.get('/:orderId', function (req, res, next) {
    res.status(200).json({
        messager: 'order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', function (req, res, next) {
    res.status(200).json({
        messager: 'order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;