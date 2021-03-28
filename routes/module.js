const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/module');

router.get('/module/info/:code/:instance/:year', moduleController.getModuleInfo);

module.exports = router;