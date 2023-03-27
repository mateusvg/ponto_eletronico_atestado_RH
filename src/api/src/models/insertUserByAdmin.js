const conn = require('../db/connection')

async function insertUser(userName, cpf, statusReq) {

    try {
        const insertUser = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO user (userName, userPassword, userPermission) VALUES (?, 123, 2)', [userName], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        const select = await new Promise((resolve, reject) => {
            conn.query('SELECT idUser from user order by idUser desc LIMIT 1;', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        let userLastId = select[0].idUser

        function changeStatus(status) {
            if (status === 'Ativo') {
                return 1
            } else if (status === 'Inativo') {
                return 2
            }
        }

        let teste = changeStatus(statusReq)
        const insertCpf = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO `ponto_atestado`.`userPersonalData` (`iduserPersonalData`, `cpf`, `user_iduser`, `statusUser_idtable1`) VALUES (0, ?, ?, ?);', [cpf, userLastId, teste], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }

}


async function getAllRegistersUsersStatus() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM medicalcertificate inner join user_has_medicalcertificate ON user_has_medicalcertificate.medicalCertificate_idmedicalCertificate = medicalcertificate.idmedicalCertificate INNER join user ON user.iduser = user_has_medicalcertificate.user_iduser order by medicalcertificate.idmedicalCertificate asc', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllUserSchedule() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select * from user where user.userPermission = 2', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        //console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function deletePersonStatusCertificateId(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('DELETE from medicalcertificate where idmedicalCertificate = ?', [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function insertNewSchedule(userName, cpf, date, phone) {

    let status = 'Agendado'

    try {
        const insertUser = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO schedule ( userName, userCpf, scheduleDate, userPhone, status) VALUES (?,?,?,?,?)', [userName, cpf, date, phone, status], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }

}

async function getAllSchedules(date) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `schedule` where scheduleDate  = ?', [date], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function deleteScheduleApointmentByAdmin(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('DELETE FROM `schedule` where idSchedule  = ?', [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}
async function updateStatusScheduleByAdmin(status, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('update `schedule` SET status =? where idSchedule  = ?', [status, id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllRegisterByMonthService(my_month, userId) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select * from eletronicpoint INNER JOIN eletronicpoint_has_user ON eletronicpoint.ideletronicPoint = eletronicpoint_has_user.eletronicPoint_ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? and month(eletronicpoint.date) = ?', [ userId, my_month], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllRegisterByMonthServiceTotalHours(my_month, userId) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(eletronicpoint.totalWork))) as totalWork FROM eletronicpoint INNER JOIN eletronicpoint_has_user ON eletronicpoint.ideletronicPoint = eletronicpoint_has_user.eletronicPoint_ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? and month(eletronicpoint.date) = ?', [ userId, my_month], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAllRegisterByMonthServiceTotalHours, getAllRegisterByMonthService, insertUser, getAllRegistersUsersStatus, deletePersonStatusCertificateId, getAllUserSchedule, insertNewSchedule, getAllSchedules, deleteScheduleApointmentByAdmin, updateStatusScheduleByAdmin }