const { createQuestionsGroupId, getAllQuestions, createQuestion, disableQuestionFunc } = require('./questionController');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get("/", checkToken, getAllQuestions);
router.post("/", checkToken, createQuestion);
router.post("/via-group", checkToken, createQuestionsGroupId);
router.patch("/", checkToken, disableQuestionFunc);

module.exports = router;