const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');

router.get('/student/info', studentController.getStudentInfo);

module.exports = router;