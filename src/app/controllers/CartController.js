const Cart = require("../models/Cart");
const { multipleMongooseToObject } = require('../../util/mongoose');

class  CartController {
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

}

module.exports = new CartController;