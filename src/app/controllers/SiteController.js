const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        const userId = req.session.userId;
        Product.find({})
            .then((product) => {
                return Cart.countDocuments({userId : userId}).then((count) => {
                    res.locals.documentCount = count;
                    return product;
                });
            })
            .then((product) => {
                return Cart.find({userId : userId}).then((cart) => {
                    const materials = product.map(product => product.material);
                    const uniqueMaterials = [...new Set(materials)];
                    User.findOne({userId: userId})
                        .then(user => {
                            res.render('home', {
                                product: multipleMongooseToObject(product),
                                cart: multipleMongooseToObject(cart),
                                user: mongooseToObject(user),
                                material: uniqueMaterials,
                            });
                        })
                    
                });
            })
            .catch(next);
    }
    address(req, res) {
        res.render('address')
    }
    login(req, res) {
        res.render('login', {
            layout: 'login1',
            pageTitle: 'Trang đăng ký'
        });
    }
    signup(req, res) {
        res.render('signup', {
            layout: 'login1',
            pageTitle: 'Trang đăng ký'
        });
    }
    show(req, res) {
        res.send("New detail")

    }
    create(req, res, next) {
        const formData = req.body;
        const user = new User(formData);
        const email = formData.email;

        User.findOne({ email: email })
            .then(existingUser => {
                if (existingUser) {
                    // Nếu email đã tồn tại, hiển thị thông báo không đăng ký được
                    return res.render('signup', {
                        layout: 'login1',
                        message: 'Đăng ký không thành công',
                    });
                } else {
                    // Nếu email không tồn tại, thực hiện tác vụ đăng ký
                    user.save()
                        .then(() => {
                            setTimeout(function () {
                                res.render('login', {
                                    layout: 'login1',
                                    message: 'Đăng ký thành công',
                                    status: 'success',
                                });
                            }, 500);
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }

    check(req, res) {
        const formData = req.body;
        const email = formData.email;
        const password = formData.password;
        User.findOne({ email: email, password: password })
            .then((user) => {
                if (user) {
                    req.session.userId = user.userId;
                    console.log('Đăng nhập thành công');
                    res.redirect('home')
                } else {
                    res.render('login', {
                        layout: 'login1',
                        pageTitle: 'Trang đăng ký',
                        message: 'Tên đăng nhập hoặc mật khẩu không đúng',
                        status: 'error'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });

    }


}

module.exports = new SiteController;
