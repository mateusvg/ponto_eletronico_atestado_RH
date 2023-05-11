const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminUserInsert')

router.post('/user/insert', controller.insertUser)

router.get('/user/status/certificate', controller.getAllRegistersUsersStatus)

router.get('/user/all', controller.getAllColaboradores)

router.get('/user/extrato', controller.getAllExtrato)

router.delete('/user/status/certificate/delete/:id', controller.deletePersonStatusCertificateId)

router.post('/user/history/month', controller.getAllRegisterByMonthService)

router.post('/user/history/month/total', controller.getAllRegisterByMonthServiceTotalHours)

router.put('/user/status/certificates/update', controller.updateStatusCertificateByAdmin)

//Sale
router.post('/sale', controller.insertSale)
router.get('/sales/all', controller.getAllSales)
router.post('/sales/date', controller.getAllSalesByDate)

//STOCK
router.get('/stock/all', controller.getAllStock)

router.post('/stock/insert', controller.insertStock)

router.delete('/stock/delete/:id', controller.deleteStock)

router.put('/stock/update', controller.updateStock)


//Schedules
router.get('/user/schedule', controller.getAllUserSchedule)

router.post('/user/schedule/insert', controller.insertNewSchedule)

router.post('/schedule/allSchedules', controller.getAllSchedules)

router.delete('/schedule/delete/:id', controller.deleteScheduleApointmentByAdmin)

router.put('/user/schedule/update', controller.updateStatusScheduleByAdmin)



module.exports = router;