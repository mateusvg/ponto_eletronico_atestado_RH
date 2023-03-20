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

async function insertUserPoint(idUser, time, date) {
    console.log(date)

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO eletronicpoint VALUES (0,?,null,?, null)', [time, date], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = { selectUser, insertUserPoint }