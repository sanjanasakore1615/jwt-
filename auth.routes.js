var express = require('express');
var router = express.Router();
const authController=require('../controllers/auth.controller');
const {body}=require('express-validator');
/* GET home page. */
router.post('/', body('Email').notEmpty().withMessage('Email can not be empty').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
body('Password').notEmpty().withMessage('Password can not be empty'),
authController.userLogin );

module.exports = router;