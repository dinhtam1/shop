
const productRouter = require('./product');
const siteRouter = require('./site');
const cartRouter = require('./cart');
const userRouter = require('./user');

function route(app) {
    app.use('/product', productRouter)
    app.use('/user', userRouter)
    app.use('/cart', cartRouter)
    app.use('/', siteRouter)
}

module.exports = route; 