const express = require('express');
const tanodCaseController = require('../controllers/TanodCaseController');
const router = express.Router();

router.get('/admin-tanod-db-view', tanodCaseController.viewTanodDB);

router.get('/admin-tanod-db-view/:id', tanodCaseController.markResolved);

router.get('/A-tanod-view-case/:id', tanodCaseController.viewTanodCase);

router.get('/A-tanod-edit-case/:id', tanodCaseController.editTanodCase);

router.post('/submit-edit-tanod-case', tanodCaseController.submitEditTanodCase);

router.get('/update-Status/:id/:status', tanodCaseController.updateStatus);

module.exports = router;