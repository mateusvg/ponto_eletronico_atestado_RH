const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController')

router.get('/all', controller.getAllUsers)

router.post('/point/insert', controller.insertUserPoint)

router.post('/point/insert/exit', controller.insertUserPointExit)

router.get('/point/date/:id', controller.getPointDateByUser)

router.get('/point/date/history/:id', controller.getPointDateByUserAllHistory)


module.exports = router;