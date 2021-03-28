const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/index');

const roadblockController = require('../controllers/roadblock');

router.get('/backoffice/roadblocks', middleware.checkAuth, roadblockController.getRoadblocks);

module.exports = router;