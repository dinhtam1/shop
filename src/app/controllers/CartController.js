const User = require('../models/User');
const Cart = require("../models/Cart");
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { response } = require('express');

class CartController {
  index(req, res, next) {
    const userId = req.session.userId;
    Cart.countDocuments({ userId: userId })
      .then((count) => {
        res.locals.documentCount = count;
        Cart.find({ userId: userId })
          .then((cart) => {
            User.findOne({ userId: userId })
              .then((user) => {

                res.render('cart', {
                  cart: multipleMongooseToObject(cart),
                  user: mongooseToObject(user),
                });
              });
          })
          .catch(next);
      })
      .catch(next);
  }

  show(req, res) {
    res.send("New detail")
  }
  store(req, res, next) {
    const formData = req.body;
    const userId = req.session.userId;
    const cart = new Cart({
      ...formData,
      userId: userId
    });
    Cart.findOne({ name: formData.name, userId: userId })
      .then(existingCart => {
        if (existingCart) {
          const newQuantity = parseInt(existingCart.quantity) + parseInt(formData.quantity);
          return Cart.updateOne({ name: formData.name, userId: userId }, { quantity: newQuantity })
            .then(() => {
              res.redirect('back');
            })
            .catch(next);
        } else {
          cart.save()
            .then(() => {
              setTimeout(function () {
                res.redirect('back');
              }, 500);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  destroy(req, res, next) {
    setTimeout(function () {
      Cart.deleteOne({ _id: req.params.id })
        .then(() => {
          res.redirect('back');
        })
        .catch(next);
    }, 500)

  }

  update(req, res, next) {
    // const filter = { $or: [{ productId: 'product1' }, { productId: 'product2' }] };
    // const newQuantity = 10; // Số lượng mới bạn muốn cập nhật

    // Cart.updateMany(filter, { quantity: newQuantity })
    //   .then(result => {
    //     console.log('Đã cập nhật số lượng cho các mặt hàng:', result);
    //   })
    //   .catch(err => {
    //     console.error('Lỗi khi cập nhật số lượng:', err);
    //   });
  }
}

module.exports = new CartController;