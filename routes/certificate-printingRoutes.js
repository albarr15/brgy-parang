const express = require('express');
const certificateController = require('../controllers/CertificateController');
const router = express.Router();

router.get('/employee-check-clearance', certificateController.viewCertClearance);

router.get('/search-cases-employee/:search_name',           certificateController.isClearedEmployee);
router.get('/search-cases-employeeLupon/:search_name',      certificateController.isClearedEmployeeLupon);

router.get('/employee-onClick-print/:FN/:MI/:LN',           certificateController.onClickView);

router.get('/employee-onClick-printLupon/:id',              certificateController.onClickViewLupon);
router.get('/employee-input-page',                          certificateController.printCertificate);

module.exports = router;