const { getAccessPoints } = require('./accessPointController');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get("/", checkToken, getAccessPoints);

module.exports = router;