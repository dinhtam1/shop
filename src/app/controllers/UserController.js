const User = require('../models/User');
const Cart = require('../models/Cart');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');

class UserController {
    index(req, res) {
        res.render('user');
    }

    show(req, res, next) {
        const userId = req.session.userId;
        User.findOne({ userId: userId })
            .then(user => {
                Cart.countDocuments({ userId: userId })
                    .then((count) => {
                        res.locals.documentCount = count;
                        Cart.find({ userId: userId })
                            .then((cart) => {
                                res.render('user', {
                                    user: mongooseToObject(user),
                                    cart: multipleMongooseToObject(cart)
                                })
                            });
                    })
                    .catch(next);

            })
            .catch(next);
    }
}

module.exports = new UserController;

