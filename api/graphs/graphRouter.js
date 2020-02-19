const {defaultProfileGraph, searchProfileGraph, getQuestionAnalysisReport} = require('./graphController');
const router = require('express').Router();
const {checkToken} = require('../../auth/token_validation');

router.get("/", checkToken, defaultProfileGraph);
router.post("/response", checkToken, searchProfileGraph);
router.post("/question", checkToken, getQuestionAnalysisReport);

module.exports = router;