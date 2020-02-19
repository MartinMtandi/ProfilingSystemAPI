const pool = require('../../config/database');

module.exports = {
    getQuestions: callback => {
        pool.query(`SELECT questions.id, questions.status, questions_group.id AS group_id, questions.question, questions.control_id, questions_group.set_name, CONCAT("[",(SELECT GROUP_CONCAT(JSON_OBJECT(id, answer)) FROM responses WHERE question_id = questions.id ORDER BY questions.id ASC),"]") AS answers FROM questions JOIN questions_group ON questions_group.id = questions.group_id ORDER BY questions.id DESC`,[],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    },
    createQuestions: (data, callback) => {
        pool.query(`INSERT into questions_group(set_name, status) VALUES(?, ?)`, [
            data.group_name, data.status
        ],
        (error, results) => {
            if(error){
                return callback(error);
            }
            
            pool.query(`INSERT into questions(question, group_id, control_id, type_id, status) VALUES(?, ?, ?, ?, ?)`,[
                data.question, results.insertId, data.control_id, data.type_id, data.question_status
            ],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                let qstnId = results.insertId;
                let sqlQuery = "INSERT into responses(question_id, answer) VALUES";
                
               
                let arr = data.answer;
                arr.forEach(element => {
                   sqlQuery = sqlQuery + "(" + qstnId + ",'" + element + "'),";
                });
                sql_str = sqlQuery.slice(0, -1); 
                
                pool.query(sql_str, [],
                (error, results) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null, results);
                });
            });
        });
    },
    createQuestionsWithGroupId: (data, callback) => {
        pool.query(`INSERT into questions(question, group_id, control_id, type_id, status) VALUES(?, ?, ?, ?, ?)`,[data.question, data.group_id, data.control_id, data.type_id, data.question_status],
        (error, results) => {
            if(error){
                return callback(error);
            }
            let qstnId = results.insertId;
            let sqlQuery = "INSERT into responses(question_id, answer) VALUES";
            
            let arr = data.answer;
            arr.forEach(element => {
                sqlQuery = sqlQuery + "(" + qstnId + ",'" + element + "'),";
            });
            sql_str = sqlQuery.slice(0, -1); 
            
            pool.query(sql_str, [],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            });
        });
    },
    toggleDisableQuestion: (data, callback) => {
        let { status, id } = data;
        pool.query(`UPDATE questions SET status = ? WHERE id = ?`,[status, id],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        });
    }
}
