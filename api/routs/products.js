const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const router = express.Router();

router.get('/', function (req, res, next) {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            }
        )
}

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
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
    }).catch(function (err) {
        console.log(err)
    })

    res.status(201).json({
        messager: 'post to products',
        createdProduct: product
    });
});


router.delete('/:productId',  (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id:id})
        .exec()
        .then(ressult => {
            console.log(ressult);
            res.status(200).json(ressult);
        })
        .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            }
        )
}


module.exports = router;