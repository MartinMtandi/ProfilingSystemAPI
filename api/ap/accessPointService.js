const pool = require('../../config/database');

module.exports = {
    getAPs: callback => {
        pool.query(`SELECT id, ap_name, status FROM access_points WHERE ap_name != 'null' && status = 1`, [],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    }
}