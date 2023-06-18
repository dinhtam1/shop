const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/:slug' , cartController.show);
router.post('/store' , cartController.store);
router.get('/' , cartController.index);


module.exports = router;