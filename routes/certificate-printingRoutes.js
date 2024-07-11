const express = require('express');
const certificateController = require('../controllers/CertificateController');
const router = express.Router();

router.get('/employee-check-clearance', certificateController.viewCertClearance);

router.get('/search-cases-employee/:search_name',       certificateController.isClearedEmployee);
router.get('/employee-onClick-print/:id',               certificateController.onClickView);
router.get('/employee-input-page',                      certificateController.printCertificate);

module.exports = router;