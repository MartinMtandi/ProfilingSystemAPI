const {getProfileGraph, filterProfileGraph, analayseQuestionGraph} = require('./graphService');

module.exports = {
    defaultProfileGraph: (req, res) => {

        getProfileGraph((err, results) => {
            if(err){
                return res.status(500).json({
                    error: err
                });
            }
            return res.json({
                data: results 
            });
        });

    },
    searchProfileGraph: (req, res) => {
        const body = req.body;
        filterProfileGraph(body, (err, results) => {
            if(err){
                return res.json({
                    error: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    },
    getQuestionAnalysisReport: (req, res) => {
        const body = req.body;
        analayseQuestionGraph(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    msg: "Database connection error"
                });
            }
            return res.status(200).json({
                data: results
            });
        });
    }
}