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
        console.log(result[0])
        return result
    } catch (err) {
        console.log(err)
    }
}

async function getPointDateByUserAllHistory(idUser) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from eletronicpoint inner join eletronicpoint_has_user ON eletronicpoint_has_user.eletronicPoint_ideletronicPoint = eletronicpoint.ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ?;', [idUser], (error, results, fields) => {
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


module.exports = { selectUser, insertUserPoint, getPointDateByUser, getPointDateByUserAllHistory }