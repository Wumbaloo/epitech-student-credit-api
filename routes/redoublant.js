const express = require('express');
const router = express.Router();

const redoublantController = require('../controllers/redoublant');

router.post('/redoublants', redoublantController.uploadRedoublantFile);
router.get('/redoublants', redoublantController.getAllRedoublants);
router.delete('/redoublants/:name', redoublantController.deleteRedoublant);
router.get('/redoublants/retrieve', redoublantController.getRedoublantsExcel);

module.exports = router;