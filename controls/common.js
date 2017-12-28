module.exports = {
    openHtml: function (url) {
        return async function (req, res, next) {
            res.locals.name = '小明';
            res.render('index')
            /*if(req.session.user_name){
                res.locals.name = req.session.user_name;
                res.render('index')
            }else {
                res.render('login')
            }*/
        }
    },
    validate: async function (req, res, next) {
        req.session.user_name ? next() : res.send({code: 0, msg: "用户已失效"});
    }

};