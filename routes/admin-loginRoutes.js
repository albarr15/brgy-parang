const express = require('express');
const userController = require('../controllers/UserController');
const router = express.Router();

router.get('/admin-login-page', (req, res) => {
    res.render('admin-login-page',{
        layout: 'layout',
        title: 'Barangay Parang - Admin Login Page',
        cssFile1: 'index',
        cssFile2: 'login-page',
        javascriptFile1: 'login',
        javascriptFile2: null,
        error: null
    });
})

router.post('/admin-login-page', userController.isUser);

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

module.exports = router;