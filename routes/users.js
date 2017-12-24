var express = require('express')
    , router = express.Router()
    , common = require('../controls/common')
    , user_control = require('../controls/user');
router
    //.all('*',common.validate)
    .post('/login',user_control.login)
    .get('/exit',user_control.exit)
module.exports = router;
