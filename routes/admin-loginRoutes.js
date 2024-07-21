const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.get('/admin-login-page',     userController.getLogin);

router.post('/admin-login-page',    userController.isUser);

router.get('/admin-homepage', (req, res) => {
    res.render('admin-homepage',{
        layout: 'layout',
        title: 'Barangay Parang - Admin Homepage',
        cssFile1: 'index',
        cssFile2: null,
        javascriptFile1: 'header',
        javascriptFile2: null,
    });
})

//SECURITY
router.post('/check-answer',            userController.checkAnswer);

router.post('/submit-new-question',     userController.changeSecurityQuestion);

module.exports = router;