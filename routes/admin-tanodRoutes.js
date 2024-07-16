const express = require('express');
const tanodCaseController = require('../controllers/TanodCaseController');
const router = express.Router();

router.get('/admin-tanod-db-view',                  tanodCaseController.viewTanodDB);

router.get('/admin-tanod-db-view/:search_name',     tanodCaseController.viewSearchTanodDB);

router.get('/admin-tanod-db-view/:id',              tanodCaseController.markResolved);

router.get('/A-tanod-view-case/:id',                tanodCaseController.viewTanodCase);

router.get('/A-tanod-edit-case/:id',                tanodCaseController.editTanodCase);

router.post('/submit-edit-tanod-case',              tanodCaseController.submitEditTanodCase);

router.get('/update-Status/:id/:status',            tanodCaseController.updateStatus);

router.get('/delete-case/:id',                      tanodCaseController.deleteTanodCase);

router.post('/mark-as-resolved',                    tanodCaseController.markMultipleTCaseResolved);

router.post('/delete-cases',                        tanodCaseController.deleteMultipleTanodCase);

router.get('/search-cases/:search_name',            tanodCaseController.searchTanodCase);

router.get('/A-tanod-create-case',                  tanodCaseController.viewCreateTanodCase);

router.post('/submit-tanod-case',                   tanodCaseController.createTanodCase);

module.exports = router;