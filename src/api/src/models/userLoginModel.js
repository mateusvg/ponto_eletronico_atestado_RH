const conn = require('../db/connection')

async function selectUser(user) {

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * from user WHERE userName = ? ', [user], (error, results, fields) => {
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

async function insertNewUser(user, password, permission) {
    let id = 0
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO user VALUES (?, ?, ?, ?) ', [id, user, password, permission], (error, results, fields) => {
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

async function recover(user, cpf, email) {
    const result = await new Promise((resolve, reject) => {
        conn.query('SELECT user.userPassword FROM `userpersonaldata` inner join user on user.iduser = userpersonaldata.user_iduser where cpf = ?', [cpf], (error, results, fields) => {
            if (error) return reject(error);
            return resolve(results);
        });
    });

    let password = result[0].userPassword
    return [password, email]
}

module.exports = { recover, selectUser, insertNewUser }