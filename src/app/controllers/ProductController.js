const Product = require('../models/Product');
const Cart = require('../models/Cart');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {

    index(req, res) {
        res.render('product')
    }
    show(req, res, next) {
        let countPromise = Cart.countDocuments({}).exec(); // Lệnh đếm trả về một Promise
      
        let productPromise = Product.findOne({ _id: req.params.id }).exec(); // Lệnh tìm kiếm trả về một Promise
      
        Promise.all([countPromise, productPromise]) // Chờ cả hai Promise hoàn thành
          .then(([count, product]) => {
            let cartPromise = Cart.find({}).exec(); // Lệnh tìm kiếm trả về một Promise
      
            cartPromise
              .then(cart => {
                res.render('product', {
                  product: mongooseToObject(product),
                  cart: multipleMongooseToObject(cart),
                  documentCount: count // Truyền số lượng tài liệu vào biến locals.documentCount
                });
              })
              .catch(next);
          })
          .catch(next);
      }
      



}

module.exports = new ProductController;

