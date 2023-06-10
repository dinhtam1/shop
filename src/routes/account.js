const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.get('/:slug' , accountController.show);
router.get('/' , accountController.index);

module.exports = router;