const express = require('express');
const accountsController = require('../controllers/UserController');
const router = express.Router();

router.get('/admin-accounts-db-view',       accountsController.viewAllAccounts);

router.get('/admin-view-acct-admin/:id',    accountsController.viewAdminAcc);

router.get('/admin-edit-acct-admin/:id',    accountsController.editAdminAcc);

router.post('/submit-edit-admin-acc',       accountsController.submitEditAdminAcc);

module.exports = router;