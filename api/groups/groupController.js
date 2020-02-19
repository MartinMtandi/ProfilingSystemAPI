const { getLastQuestionGroup } = require('./groupService');

module.exports = {
    lastQuestionGroup: (req, res) => {
        getLastQuestionGroup((err, results) => {
            if(err){
                return res.status(500).json({
                    error: "ERROR! Server Error"
                });
            }
            return res.json({
                data: results
            });
        });
    }
}