const { createQuestionsWithGroupId, getQuestions, createQuestions, toggleDisableQuestion } = require('./questionService');

module.exports = {
    getAllQuestions: (req, res) => {
        getQuestions((err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Error! Server Error"
                });
            }
            return res.json({
                data: results
            });
        });
    },
    createQuestion: (req, res) => {
        const body = req.body;
        createQuestions(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    createQuestionsGroupId: (req, res) => {
        const body = req.body;
        createQuestionsWithGroupId(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    disableQuestionFunc: (req, res) => {
        const body = req.body;
        toggleDisableQuestion(body, (err, results) => {
            if(err){
                return res.status(400).json({
                    error: "Bad Connection"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    }
}