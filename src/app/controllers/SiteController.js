const Product = require('../models/Product');
const { mutipleMongooseToObject } = require('../../util/mogoose');
class  SiteController {
    index(req, res) {
        Product.find({})
            .then((product) => {
                res.render('home' , {
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch((error) => next(error));
       // res.render('home')
    }
    address(req, res) {
        res.render('address')
    }
    show(req, res) {
        res.send("New detail")

    }

}

module.exports = new SiteController;