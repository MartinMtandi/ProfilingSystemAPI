const pool = require('../../config/database');

module.exports = {
    getProfileGraph: callback => {
        pool.query(`SELECT COUNT(DISTINCT(clients.id))  AS total , SUM(gender) AS males , COUNT(DISTINCT(clients.id))  -  SUM(gender) AS females  FROM clients  WHERE
        id  IN ( SELECT client_id FROM client_profile INNER JOIN responses ON client_profile.response = responses.id )
         AND id IN (SELECT DISTINCT(client_id) FROM connections)`,[],
         (error, results) => {
             if(error){
                 return callback(error);
             }
             return callback(null, results);
         });
    },
    filterProfileGraph: (data, callback) => {

        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }

        let resId = data.responseId;
        let childQ = ``;

        resId.map((res, index) => {
            var mycharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let lvalue = makeid(5);
            let rvalue = makeid(5);

            if(index === 0){
                childQ += `SELECT DISTINCT ${lvalue}.id, ${lvalue}.gender, ${lvalue}.firstname FROM clients ${lvalue} INNER JOIN client_profile ${rvalue} ON ${lvalue}.id = ${rvalue}.client_id WHERE ${rvalue}.response IN (${res})) AS ${mycharacters[index]} `;
            }
            
            if(index > 0){
                childQ += ` INNER JOIN (SELECT DISTINCT ${lvalue}.id, ${lvalue}.gender, ${lvalue}.firstname FROM clients ${lvalue} INNER JOIN client_profile ${rvalue} ON ${lvalue}.id = ${rvalue}.client_id WHERE ${rvalue}.response IN (${res})) AS  ${mycharacters[index]} ON  ${mycharacters[index - 1]}.id =  ${mycharacters[index]}.id `
            }
           
           if(resId.length === index + 1){
               pool.query(`SELECT COUNT(tbl.id) AS total, tbl.gender FROM(SELECT ${mycharacters[0]}.id, ${mycharacters[0]}.gender FROM(${childQ}) tbl GROUP BY tbl.gender`,[],
               (error, results) => {
                   if(error){
                       return callback(error);
                   }

                   return callback(null, results);
               }) 
           }
        });
        
    },
    analayseQuestionGraph: (data, callback) => {
        pool.query(`SELECT c.response, r.answer, COUNT(*) AS total FROM client_profile AS c INNER JOIN responses AS r ON r.id = c.response WHERE response IN (SELECT r.id FROM responses AS r WHERE r.question_id = ${data.questionId}) GROUP BY response`,[],
        (error, results) => {
            if(error){
                return callback(error);
            }
            return callback(null, results);
        })
    }
}