const Product = require('../models/Product');
const { mongooseToObject } = require('../../util/mogoose');

class  ProductController {
    index(req, res) {
        res.render('products/show')
    }
    show(req, res ,  next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/show', { product: mongooseToObject(product) })
            })
            .catch(next);
    }

}

module.exports = new ProductController;