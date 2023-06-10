
const productRouter = require('./product');
const siteRouter = require('./site');
const orderRouter = require('./order');
const accountRouter = require('./account');

function route(app) {
    app.use('/product' , productRouter)
    app.use('/account' , accountRouter)
    app.use('/order' , orderRouter)
    app.use('/' , siteRouter)
}

module.exports = route;