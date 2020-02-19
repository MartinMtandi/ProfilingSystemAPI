const { getAPs } = require('./accessPointService');

module.exports = {
    getAccessPoints: (req, res) => {
        getAPs((err, results) => {
            if(err){
                return res.status(500).json({
                    error: "Error! Bad Request"
                });
            }
            return res.json({
                data: results
            });
        });
    }
}