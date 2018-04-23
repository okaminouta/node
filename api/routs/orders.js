const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).json({
        messager: 'orders feched'
    });
});

router.post('/', function (req, res, next) {
    res.status(201).json({
        messager: 'order created'
    });
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