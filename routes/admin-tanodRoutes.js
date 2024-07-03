const express = require('express');
const tanodCaseController = require('../controllers/TanodCaseController');
const router = express.Router();

router.get('/admin-tanod-db-view', tanodCaseController.viewTanodDB);

router.get('/admin-tanod-db-view/:id', tanodCaseController.markResolved);

router.get('/A-tanod-view-case/:id', tanodCaseController.viewTanodCase);

module.exports = router;