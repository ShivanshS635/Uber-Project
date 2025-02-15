const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min : 6}).withMessage('Password Must Be At Least 6 Characters Long'),
    body('fullname.firstname').isLength({min : 2}).withMessage('First Name Must Be At Least 2 Characters Long'),
] , userController.register);

module.exports = router;