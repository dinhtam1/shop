const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/:slug' , cartController.show);
router.post('/store' , cartController.store);
router.delete('/:id' , cartController.destroy);
router.get('/' , cartController.index);


module.exports = router;