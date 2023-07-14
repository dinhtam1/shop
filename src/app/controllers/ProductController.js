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
    const userId = req.session.userId;
    let countPromise = Cart.countDocuments({userId : userId}).exec();
    let productPromise = Product.findOne({ slug: req.params.slug }).exec();
    Promise.all([countPromise, productPromise])
      .then(([count, product]) => {
        let cartPromise = Cart.find({userId : userId}).exec();
        let userPromise = User.findOne({userId : userId}).exec(); // Truy vấn thông tin người dùng dựa trên userId (giả sử bạn đã có userId từ phương thức xác thực)
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

