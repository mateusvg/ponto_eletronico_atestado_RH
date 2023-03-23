const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminUserInsert')

router.post('/user/insert', controller.insertUser)

router.get('/user/status/certificate', controller.getAllRegistersUsersStatus)

router.delete('/user/status/certificate/delete/:id', controller.deletePersonStatusCertificateId)

router.get('/user/schedule', controller.getAllUserSchedule)

router.post('/user/schedule/insert', controller.insertNewSchedule)

router.post('/schedule/allSchedules', controller.getAllSchedules)




module.exports = router;