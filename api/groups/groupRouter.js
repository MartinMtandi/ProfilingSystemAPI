const { lastQuestionGroup } = require('./groupController');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get("/", checkToken, lastQuestionGroup);

module.exports = router;