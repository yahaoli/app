module.exports = {
    login: async function (req, res, next) {
        try {
            var user = await sql.db_mysql('SELECT * FROM user where user_name=?',[req.body.name]);
            if(user.length){
                var name=req.body.name,id= user[0].user_id;
                    if(user[0].user_password===req.body.password){
                        req.session.user_name=name;
                        req.session.user_id=id;
                        res.send({code:1})
                    }else{
                        res.send({code:2,msg:"密码错误"})
                    }
            }else {
                res.send({code:2,msg:"用户不存在"})
            }
        } catch (err) {
            console.log(err.message)
        }
    },
    exit:async function (req, res, next) {
        delete  req.session.user_name;
        delete  req.session.user_id;
        res.send({code:1})
    }
};

