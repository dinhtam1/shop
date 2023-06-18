const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {
    index(req, res) {
        res.render('product')
    }
    show(req, res, next) {

        Product.findOne({ _id: req.params.id })
            .then(product => {
                Cart.countDocuments({})
                .then((count) => {
                    res.locals.documentCount = count;
                })
                .catch(next);
                Cart.find({})
                    .then((cart) => {
                        res.render('product', {
                            product: mongooseToObject(product),
                            cart: multipleMongooseToObject(cart)
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }

}

module.exports = new ProductController;

