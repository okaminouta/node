const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParcer = require('body-parser');
const mongoose = require('mongoose');

const productRouts = require('./api/routs/products');
const orderRouts = require('./api/routs/orders');

mongoose.connect('mongodb+srv://okamiuta:' + process.env.MONGO_PW + '@node-test-7qi1c.mongodb.net/test');

app.use(morgan('dev'));
app.use(bodyParcer.urlencoded({extended: false}));
app.use(bodyParcer.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

app.use('/products', productRouts);
app.use('/orders', orderRouts);

app.use(function (req, res, next) {
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.json({error: error.message})
})

module.exports = app;

// npm i nodemon