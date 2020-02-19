const pool = require('../../config/database');

module.exports = {
    getLastQuestionGroup: callback => {
        pool.query(`SELECT questions_group.id, questions_group.set_name FROM questions_group 
        JOIN questions ON questions.group_id = questions_group.id 
        WHERE questions.status = 0 AND questions_group.id = (SELECT MAX(id) FROM questions_group)`,[],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    }
}