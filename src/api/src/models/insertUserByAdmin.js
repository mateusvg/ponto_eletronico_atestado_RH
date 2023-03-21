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

module.exports = { insertUser, getAllRegistersUsersStatus }