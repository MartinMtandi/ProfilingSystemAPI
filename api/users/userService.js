const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        let {firstname, lastname, email, phone, access_level, department, password, status} = data;
        pool.query(`INSERT into users(firstname, lastname, email, phone, access_level, department, password, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [
            firstname, lastname, email, phone, access_level, department, password, status
        ],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        });
    },
    getUsers: callback => {
        pool.query(`SELECT id, firstname, lastname, email, phone, status, access_level, department FROM users ORDER BY id DESC`,[],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    },
    getUserById: (id, callback) => {
        pool.query(`SELECT id, firstname, lastname, email, phone, status, access_level, department FROM users WHERE id = ?`,[id],
        (error, results) => {
            if(error){
               return callback(error);
            }
            return callback(null, results[0]);
        });
    },
    updateUser: (data, callback) => {
        pool.query(`UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ?, status = ?, access_level = ?, department = ?, password = ? WHERE id = ?`, [
            data.firstname,
            data.lastname,
            data.email,
            data.phone,
            data.status,
            data.access_level,
            data.department,
            data.password,
            data.id
        ],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    },
    deleteUser: (data, callback) => {
        pool.query(`DELETE from users WHERE id = ?`,[data.id],
        (error, results) => {
            if(error){
               return callback(error);
            }
            return callback(null, results[0]);
        });
    },
    getUserByEmail: (email, callback) => {
        pool.query(`SELECT * FROM users WHERE email = ?`,[email],
        (error, results) => {
            if(error){
                callback(error);
            }
            return callback(null, results[0]);
        });
    }
};