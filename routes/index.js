var express = require('express');
var fs=require('fs');
var router = express.Router();
var common=require('../controls/common')
/* GET home page. */
router.get('/',common.openHtml('index'));
router.get('/download', async function(req, res, next) {
   /* var options = {
        root: __dirname + '/../',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
            fs.unlink('../mysql-5.7.17.msi',function () {
                console.log()
            })
        }
    });*/
    res.download('../test',function () {
        fs.unlink('../test',function () {
            
        })
    });
});

module.exports = router;
