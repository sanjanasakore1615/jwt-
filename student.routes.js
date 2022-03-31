var express = require('express');
var router = express.Router();
const studentController = require('../controllers/student.controllers');
const { body } = require('express-validator');

/* GET home page. */
router.get('/', studentController.getAllStudents);
router.get('/find/:id', studentController.findById);
router.post('/delete/:id', studentController.deleteById);
router.post('/updatemobile/:id', studentController.updateMobile);
router.post('/create',
    body('Name').notEmpty().withMessage('Name required').isAlpha().withMessage('Please enter a name in char only').isLength({ min: 2, max: 100 }).withMessage('Name should be between 2 and 100 characters'),
     body('Email').notEmpty().withMessage('Email can not be empty').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
     body('Mobile').notEmpty().withMessage('Mobile can not be empty').isLength({min:10, max:12}).withMessage('Please enter valid Mobile number 10 or 12 numbers in size').isNumeric().withMessage('Please enter a valid Mobile number in numbers only'),
     body('Age').notEmpty().withMessage('Please enter age').isNumeric().withMessage('Please enter a valid Age number in numbers only')
     ,body('password').notEmpty().withMessage('Please enter password')
     ,studentController.createStudent);

module.exports = router;
