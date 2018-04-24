const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).json({
        messager: 'qweqwe'
    });
});

router.get('/:productId', function (req, res, next) {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            messager: 'specialID'
        });
    } else {
        res.status(200).json({
            messager: 'nothing'
        });
    }
});

router.post('/', function (req, res, next) {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(201).json({
        messager: 'post to products',
        createdProduct: product
    });
});


module.exports = router;