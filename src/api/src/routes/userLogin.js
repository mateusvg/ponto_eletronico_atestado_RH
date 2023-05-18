const express = require('express');
const router = express.Router();
const controller = require('../controllers/userLoginController')

router.post('/all', controller.getAllUsers)
router.post('/new', controller.insertNewUser)
router.post('/recover', controller.recover)

module.exports = router;