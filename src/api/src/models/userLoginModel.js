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

module.exports = { selectUser }