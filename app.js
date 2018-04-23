const express = require('express');
const app = express();

const productRouts = require('./api/routs/products');
const orderRouts = require('./api/routs/orders');

app.use('/products', productRouts);
app.use('/orders', orderRouts);

module.exports = app;

// npm i nodemon