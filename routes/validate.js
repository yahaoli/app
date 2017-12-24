var express = require('express')
    , router = express.Router()
    ,validate_ctl=require('../controls/validate_ctl')
router
    //.all('*',common.validate)
    .post('/platform',validate_ctl.platform)
    .post('/platformAll', validate_ctl.platformAll)
    .post('/platform/add',validate_ctl.platform_add)
    .post('/platform/purchase',validate_ctl.platform_purchase)
    .post('/purchase/:handle',validate_ctl.platform_handle)
    .post('/platform/clear',validate_ctl.platform_clear)
    .post('/platform/submit',validate_ctl.platform_submit)
module.exports = router;