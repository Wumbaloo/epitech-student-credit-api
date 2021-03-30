const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/index');

const roadblockController = require('../controllers/roadblock');

router.get('/backoffice/roadblocks', middleware.checkAuth, roadblockController.getRoadblocks);

router.post('/backoffice/roadblock', middleware.checkAuth, roadblockController.createRoadblock);

router.post('/backoffice/roadblock/:id', middleware.checkAuth, roadblockController.editRoadblock);

router.delete('/backoffice/roadblock/:id', middleware.checkAuth, roadblockController.deleteRoadblock);

module.exports = router;