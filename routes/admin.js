const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/backoffice/login', adminController.loginAdmin);

module.exports = router;