const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mogoose');

class  ProductController {
    index(req, res) {
        res.render('product')
    }
    show(req, res ,  next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('product', { product: mongooseToObject(product) })
            })
            .catch(next);
    }

}

module.exports = new ProductController;