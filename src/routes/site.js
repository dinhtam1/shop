const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/address' , siteController.address);
router.get('/home' , siteController.index);
router.get('/login' , siteController.login);
router.post('/check' , siteController.check);
router.post('/create' , siteController.create);
router.get('/signup' , siteController.signup);
router.get('/:slug' , siteController.show);
router.get('/' , siteController.login);

module.exports = router;