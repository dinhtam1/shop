const Cart = require("../models/Cart");
const { multipleMongooseToObject } = require('../../util/mongoose');

class CartController {
  index(req, res, next) {
    Cart.countDocuments({})
      .then((count) => {
        res.locals.documentCount = count;
        Cart.find({})
          .then((cart) => {
            res.render('cart', { cart: multipleMongooseToObject(cart) });
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
    const cart = new Cart(formData);
    cart.save()
      .then(() => {
        setTimeout(function () {
          res.redirect(req.get('referer'));
        }, 500);
      })
      .catch(next);
  }


}

module.exports = new CartController;