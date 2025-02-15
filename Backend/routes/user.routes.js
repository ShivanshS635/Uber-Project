const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password Must Be At Least 6 Characters Long'),
    body('fullname.firstname').isLength({min : 2}).withMessage('First Name Must Be At Least 2 Characters Long'),
] , userController.register);

router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password Must Be At Least 6 Characters Long'),
] , userController.login);

router.get('/profile' , authMiddleware.authUser , userController.getProfile);

router.get('/logout' , authMiddleware.authUser , userController.logout);

module.exports = router;