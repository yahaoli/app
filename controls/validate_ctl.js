module.exports = {
    platform: async function (req, res) {
        console.log(11111111)
        try {
            var start = (parseInt(req.body.page) - 1) * req.body.limit, end = parseInt(req.body.limit);
            var data = await sql.db_mysql('SELECT * FROM platform limit ?,?', [start, end]);
            res.send({"code": 1, data: data})
        } catch (err) {
            console.log(err.message)
        }

    }
    , platformAll: async function (req, res) {
        var user_id = req.session.user_id;
        try {
            var count = await sql.db_mysql('select count(id) as count from platform');
            var count1 = await sql.db_mysql('select count(goodsid) as count from card where user=?', [user_id]);
            res.send({"code": 1, "count": count[0].count, count1: count1[0].count, limit: 10})
        } catch (err) {
            console.log(err.message)
        }

    }
    , platform_add: async function (req, res) {
        try {
            var user_id = req.session.user_id, goods_id = req.body.id;
            await sql.db_mysql(' INSERT INTO card (goodsid,user,num,addtime) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE num=num+1,addtime=?', [goods_id, user_id, 1, format(), format()]);
            var count = await sql.db_mysql('select count(goodsid) as count from card where user=?', [user_id]);
            res.send({code: 1, count: count[0].count, msg: '加入购物车成功'})
        } catch (err) {
            console.log(err.message)
        }
    }
    , platform_purchase: async function (req, res) {
        try {
            var sql_text = 'select card.goodsid,card.num,platform.name,platform.price,platform.img from card\n' +
                'inner join platform on card.goodsid =platform.id WHERE card.user=? ORDER BY card.addtime desc'
            var shop = await sql.db_mysql(sql_text, [req.session.user_id]);
            res.send({code: 1, data: shop})
        } catch (err) {
            console.log(err.message)
        }
    }
    , platform_handle: async function (req, res) {
        var handle = req.params.handle
            , goods_id = req.body.id
            , user_id = req.session.user_id
            , message = '保存成功';
        if (handle === 'set') {
            var num = req.body.num;
            await sql.db_mysql('UPDATE card  SET num=?,addtime=? where user=? and goodsid=?', [num, format(), user_id, goods_id]);
        } else {
            await sql.db_mysql('DELETE FROM card where user=? and goodsid=?', [user_id, goods_id]);
            message = '删除成功';
        }
        res.send({code: 1, msg: message})
    }
    , platform_clear: async function (req, res) {
        await sql.db_mysql('DELETE FROM card where user=?', [req.session.user_id]);
        res.send({code: 1, msg: '已清空'})
    }
    , platform_submit: async function (req, res) {
        var user_id = req.session.user_id
            ,time=format();
        var sql_text1=`INSERT INTO store (goodsid,user,num,addtime)
select goodsid,user,num,'${time}' FROM card where user=${user_id}
on DUPLICATE KEY UPDATE store.num=VALUES(num)+store.num,store.addtime='${time}'`
        var a=await sql.db_mysql(sql_text1);
        await sql.db_mysql('DELETE FROM card where user=?', [user_id]);
      if(a.affectedRows){
          res.send({code: 1, message: '提交成功'})
      }else {
          res.send({code: 2, message: '购物车为空'})
      }
    }
}


function format() {
    var date = new Date();
    var year = date.getFullYear()
        , month = date.getMonth() + 1
        , day = date.getDate()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , second = date.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    var a = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return a
}