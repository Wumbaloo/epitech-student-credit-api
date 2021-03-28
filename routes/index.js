const express = require('express');
const router = express.Router();

const moduleRouter = require('./module');
const planningRouter = require('./planning');
const redoublantRouter = require('./redoublant');
const studentRouter = require('./student');
const adminRouter = require('./admin');
const roadblockRouter = require('./roadblock');

router.use(moduleRouter);
router.use(planningRouter);
router.use(redoublantRouter);
router.use(studentRouter);
router.use(adminRouter);
router.use(roadblockRouter);

router.route('/')
.get((req, res) => {
    res.json({ success: true, message: "Hey there! The API is working properly." });
});

module.exports = router;