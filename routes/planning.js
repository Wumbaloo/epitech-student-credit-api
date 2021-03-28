const express = require('express');
const router = express.Router();

const planningController = require('../controllers/planning');

router.get('/planning/:start/:end', planningController.retrievePlanning);

module.exports = router;