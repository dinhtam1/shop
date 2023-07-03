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
    const userId = req.session.userId;
    const cart = new Cart({
      ...formData,
      userId: userId
    });
    Cart.findOne({ _id: formData._id })
      .then(existingId => {
        if (existingId) {
          const newQuantity = parseInt(existingId.quantity) + parseInt(formData.quantity);
          return Cart.updateOne({ _id: formData._id }, { quantity: newQuantity })
            .then(() => {
              res.redirect(req.get('referer'));
            })
            .catch(next)
        } else {
          cart.save()
            .then(() => {
              setTimeout(function () {
                res.redirect(req.get('referer'));
              }, 500);
            })
            .catch(next);
        }
      })
      .catch(next);


  }



}

module.exports = new CartController;