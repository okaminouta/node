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
    }else {
        res.status(200).json({
            messager: 'nothing'
        });
    }
});


module.exports = router;