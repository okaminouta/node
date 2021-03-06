const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const router = express.Router();

router.get('/', function (req, res, next) {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url:'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(function (val) {
            console.log(val)
            if (val) res.status(200).json(val);
            else res.status(404).json({error: 'nothing found'});
        })
        .catch(function (err) {
            console.log(err)
            res.status(500).json({error: err});
        })
});

router.post('/', function (req, res, next) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(function (res) {
        console.log(res)
        res.status(201).json({
            messager: 'post to products',
            createdProduct: product
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })


});


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(ressult => {
            console.log(ressult);
            res.status(200).json(ressult);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(ressult => {
            console.log(ressult);
            res.status(200).json(ressult);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
})


module.exports = router;