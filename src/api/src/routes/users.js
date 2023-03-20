const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController')

router.get('/all', controller.getAllUsers)

router.post('/point/insert', controller.insertUserPoint)

module.exports = router;