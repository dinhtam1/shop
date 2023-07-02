const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProductController {

  index(req, res) {
    res.render('product')
  }
  show(req, res, next) {
    let countPromise = Cart.countDocuments({}).exec();
    let productPromise = Product.findOne({ _id: req.params.id }).exec();
  
    Promise.all([countPromise, productPromise])
      .then(([count, product]) => {
        let cartPromise = Cart.find({}).exec();
        let userPromise = User.findOne({ }).exec(); // Truy vấn thông tin người dùng dựa trên userId (giả sử bạn đã có userId từ phương thức xác thực)
  
        Promise.all([cartPromise, userPromise])
          .then(([cart, user]) => {
            res.render('product', {
              product: mongooseToObject(product),
              cart: multipleMongooseToObject(cart),
              user: mongooseToObject(user),
              documentCount: count
            });
          })
          .catch(next);
      })
      .catch(next);
  }
  
  
  




}

module.exports = new ProductController;

