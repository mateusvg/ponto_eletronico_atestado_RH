const conn = require('../db/connection')

async function selectUser(user) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select user.userName, userpersonaldata.cpf, statususer.status  from user INNER join userpersonaldata on user.iduser = userpersonaldata.user_iduser INNER join statususer ON statususer.idtable1 = userpersonaldata.statusUser_idtable1 where user.userPermission = 2 ', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(result[0])
        return result
    } catch (err) {
        console.log(err)
    }
}

async function insertUserPoint(idUser, time, date, counter) {
    console.log(date)

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO eletronicpoint VALUES (0,?,null,?, null, true, false,?)', [time, date, counter], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        const select = await new Promise((resolve, reject) => {
            conn.query('SELECT ideletronicPoint from eletronicpoint order by ideletronicPoint desc LIMIT 1;', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let ideletronicPoint = select[0].ideletronicPoint

        const insertCpf = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO `ponto_atestado`.`eletronicpoint_has_user` (`eletronicPoint_ideletronicPoint`, user_iduser ) VALUES (?,?);', [ideletronicPoint, idUser], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }
}


async function insertUserPointExit(idEletronicPoint, finalTime) {
    console.log(date)
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('update eletronicpoint set finalTime = ?, finishWork = true where ideletronicPoint = ?', [finalTime, idEletronicPoint], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        const insertDiffTime = await new Promise((resolve, reject) => {
            console.log('Diferenaça')
            conn.query('SELECT TIMEDIFF(eletronicpoint.finalTime, eletronicpoint.initialTime) as totalWorked from eletronicpoint where eletronicpoint.ideletronicPoint = ?', [idEletronicPoint], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        let totalWork = insertDiffTime[0].totalWorked
        console.log(`total work ${JSON.stringify(totalWork)}`)
        const updateTotalWork = await new Promise((resolve, reject) => {
            conn.query('update eletronicpoint set totalWork = ? where ideletronicPoint = ?', [totalWork, idEletronicPoint], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }
}

async function getPointDateByUser(idUser) {
    function dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = data.getFullYear();
        return ano + "-" + mes + "-" + dia;
    }
    date = dataAtualFormatada()

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from eletronicpoint inner join eletronicpoint_has_user ON eletronicpoint_has_user.eletronicPoint_ideletronicPoint = eletronicpoint.ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? AND eletronicpoint.date = ? ', [idUser, date], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        if (result[0] === undefined) {
            result[0] = { "ideletronicPoint": 0, "initialTime": "0", "finalTime": null, "date": "", "totalWork": null, "todayEnter": 0, "finishWork": 0, "eletronicPoint_ideletronicPoint": 27, "user_iduser": 2, "iduser": 2, "userName": "user1", "userPassword": "user1", "userPermission": 2 }
        }
        console.log(`resultado : ${JSON.stringify(result[0])}`)
        return result
    } catch (err) {
        console.log(err)
    }
}

async function getPointDateByUserAllHistory(idUser) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from eletronicpoint inner join eletronicpoint_has_user ON eletronicpoint_has_user.eletronicPoint_ideletronicPoint = eletronicpoint.ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? ORDER BY eletronicpoint.date ASC ', [idUser], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        if (result[0] === undefined) {
            result[0] = { "ideletronicPoint": 0, "initialTime": "0", "finalTime": null, "date": "", "totalWork": null, "todayEnter": 0, "finishWork": 0, "eletronicPoint_ideletronicPoint": 27, "user_iduser": 2, "iduser": 2, "userName": "user1", "userPassword": "user1", "userPermission": 2 }
        }
        console.log(`resultado : ${JSON.stringify(result[0])}`)
        return result
    } catch (err) {
        console.log(err)
    }
}

async function getAllStatusCertificate(idUser) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select * from medicalcertificate INNER join user_has_medicalcertificate ON user_has_medicalcertificate.medicalCertificate_idmedicalCertificate = medicalcertificate.idmedicalCertificate INNER JOIN user ON user.iduser = user_has_medicalcertificate.user_iduser where user.iduser = ?', [idUser], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(`resultado : ${JSON.stringify(result[0])}`)
        return result
    } catch (err) {
        console.log(err)
    }
}


async function postFormUser(idForm, nomePacienteBody, cpfBody, nomeMedicoBody, dataBody, aptidaoBody, anexo, userId) {
    let status = "1"
    try {
        const result = await new Promise((resolve, reject) => {
            console.log('postFormModel')
            conn.query('INSERT INTO medicalCertificate (`idmedicalCertificate`, `patientName`, `patientCpf`, `doctorName`, `date`, `fitness`, `attachment`, `statusByCpf_idstatusByCpf`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [idForm, nomePacienteBody, cpfBody, nomeMedicoBody, dataBody, aptidaoBody, anexo, status], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });

        });

        const select = await new Promise((resolve, reject) => {
            conn.query('SELECT idmedicalCertificate from medicalCertificate order by idmedicalCertificate desc LIMIT 1;', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let idmedicalCertificate = select[0].idmedicalCertificate

        const finalInsert = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO user_has_medicalcertificate (`user_iduser`, `medicalCertificate_idmedicalCertificate`, `medicalCertificate_statusByCpf_idstatusByCpf`) VALUES (?, ?, ?)', [userId, idmedicalCertificate, 1], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        return result
    } catch (err) {
        console.log(err)
    }
}

module.exports = { selectUser, insertUserPoint, getPointDateByUser, getPointDateByUserAllHistory, insertUserPointExit, postFormUser, getAllStatusCertificate }