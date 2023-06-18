const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { multipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Product.find({})
            .then((product) => {
                return Cart.countDocuments({}).then((count) => {
                    res.locals.documentCount = count;
                    return product;
                });
            })
            .then((product) => {
                return Cart.find({}).then((cart) => {
                    res.render('home', {
                        product: multipleMongooseToObject(product),
                        cart: multipleMongooseToObject(cart),
                    });
                });
            })
            .catch(next);
    }
    address(req, res) {
        res.render('address')
    }
    show(req, res) {
        res.send("New detail")

    }

}

module.exports = new SiteController;
