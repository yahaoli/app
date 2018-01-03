module.exports = {
    platform: async function (req, res) {
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
            var count1 = await sql.db_mysql('select count(goodsid) as count from card where user=? and type=1', [user_id]);
            res.send({"code": 1, "count": count[0].count, count1: count1[0].count, limit: 10})
        } catch (err) {
            console.log(err.message)
        }

    }
    , platform_add: async function (req, res) {
        try {
            var user_id = req.session.user_id, goods_id = req.body.id;
            await sql.db_mysql('INSERT INTO card (goodsid,user,num,addtime,type) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE num=num+1,addtime=?', [goods_id, user_id, 1, format(), 1, format()]);
            var count = await sql.db_mysql('select count(goodsid) as count from card where user=? and type=1', [user_id]);
            res.send({code: 1, count: count[0].count, msg: '加入购物车成功'})
        } catch (err) {
            console.log(err.message)
        }
    }
    , platform_purchase: async function (req, res) {
        try {
            var sql_text = 'select card.goodsid,card.num,platform.name,platform.price,platform.img from card\n' +
                'inner join platform on card.goodsid =platform.id WHERE card.user=? and card.type=1 ORDER BY card.addtime desc'
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
            await sql.db_mysql('UPDATE card  SET num=?,addtime=? where user=? and goodsid=? and type=1', [num, format(), user_id, goods_id]);
        } else {
            await sql.db_mysql('DELETE FROM card where user=? and goodsid=? and type=1', [user_id, goods_id]);
            message = '删除成功';
        }
        res.send({code: 1, msg: message})
    }
    , platform_clear: async function (req, res) {
        await sql.db_mysql('DELETE FROM card where user=? and type=1', [req.session.user_id]);
        res.send({code: 1, msg: '已清空'})
    }
    , platform_submit: async function (req, res) {
        var user_id = req.session.user_id
            , time = format();
        var sql_text1 = `INSERT INTO store (goodsid,user,num,addtime,isSale)
select goodsid,user,num,'${time}',0 FROM card where user=${user_id} and type=1
on DUPLICATE KEY UPDATE store.num=VALUES(num)+store.num,store.addtime='${time}'`
        var a = await sql.db_mysql(sql_text1);
        if (a.affectedRows) {
            await sql.db_mysql(`INSERT INTO record (goodsid,user,num,time,type) SELECT goodsid,user,num,'${time}',1 FROM card WHERE card.user=${user_id} and card.type=1`);
            await sql.db_mysql('DELETE FROM card where user=? and type=1', [user_id]);
            res.send({code: 1, msg: '提交成功'})
        } else {
            res.send({code: 2, msg: '购物车为空'})
        }
    }
    , storeAll: async function (req, res) {
        try {
            var user_id = req.session.user_id;
            var count = await sql.db_mysql('select count(goodsid) as count from store where user=?', [user_id]);
            res.send({"code": 1, "count": count[0].count, limit: 10})
        } catch (err) {
            console.log(err.message)
        }
    }
    , store: async function (req, res) {
        try {
            var user_id = req.session.user_id;
            var start = (parseInt(req.body.page) - 1) * req.body.limit, end = parseInt(req.body.limit);
            var data = await sql.db_mysql('SELECT store.goodsid,store.salePrice,store.num,date_format(store.nulltime,"%Y/%c/%d %h:%i:%s") as nulltime,store.isSale,date_format(store.addtime,"%Y/%c/%d %h:%i:%s") as addtime,platform.img,platform.name,platform.price,platform.type FROM store INNER JOIN platform ON store.goodsid=platform.id where store.user=? limit ?,?', [user_id, start, end]);
            res.send({"code": 1, data: data})
        } catch (err) {
            console.log(err.message)
        }

    }
    , store_handle: async function (req, res) {
        var handle = req.params.handle
            , goods_id = req.body.id
            , user_id = req.session.user_id
            , message = '保存成功'
            , code = 1;
        if (handle === 'set') {
            var salePrice = req.body.salePrice;
            if (salePrice) {
                await sql.db_mysql('UPDATE store  SET salePrice=? where user=? and goodsid=?', [salePrice, user_id, goods_id]);
            } else {
                var a = await sql.db_mysql('UPDATE store  SET isSale=? where user=? and goodsid=? and salePrice>0', [req.body.isSale, user_id, goods_id]);
                if (a.affectedRows * 1 === 0) {
                    code = 2;
                    message = '商品没有售价不能上架';
                }
            }
        } else {
            var b = await sql.db_mysql('DELETE FROM store where user=? and goodsid=? and num=0 and isSale=0', [user_id, goods_id]);
            if (b.affectedRows * 1 === 0) {
                code = 2;
                message = '不能删除库存大于0或者未下架的商品';
            } else {
                message = '删除成功';
            }
        }
        res.send({code: code, msg: message})
    }
    , storageOutAll: async function (req, res) {
        var user_id = req.session.user_id;
        try {
            var count = await sql.db_mysql('select count(goodsid) as count from store where user=? and isSale=1 and num>0', [user_id]);
            var count1 = await sql.db_mysql('select count(goodsid) as count from card where user=? and type=2', [user_id]);
            res.send({"code": 1, "count": count[0].count, count1: count1[0].count, limit: 10})
        } catch (err) {
            console.log(err.message)
        }
    }
    , storageOut: async function (req, res) {
        try {
            var user_id = req.session.user_id;
            var start = (parseInt(req.body.page) - 1) * req.body.limit, end = parseInt(req.body.limit);
            var data = await sql.db_mysql('SELECT store.goodsid,store.salePrice,store.num,platform.img,platform.name,platform.type FROM store INNER JOIN platform ON store.goodsid=platform.id where store.user=? and isSale=1 and num>0 limit ?,?', [user_id, start, end]);
            res.send({"code": 1, data: data})
        } catch (err) {
            console.log(err.message)
        }
    }
    , storageOut_add: async function (req, res) {
        try {
            var user_id = req.session.user_id, goods_id = req.body.id;
            await sql.db_mysql('INSERT INTO card (goodsid,user,num,addtime,type) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE num=num+1,addtime=?', [goods_id, user_id, 1, format(), 2, format()]);
            var count = await sql.db_mysql('select count(goodsid) as count from card where user=? and type=2', [user_id]);
            res.send({code: 1, count: count[0].count, msg: '加入购物车成功'})
        } catch (err) {
            console.log(err.message)
        }
    }
    , storageOut_shop: async function (req, res) {
        try {
            var sql_text = 'select card.goodsid,card.num as shopNum,store.num,platform.name,platform.price,platform.img from card\n' +
                'inner join platform on card.goodsid =platform.id inner join store on card.goodsid =store.goodsid and card.user=store.user WHERE card.user=? and card.type=2 ORDER BY card.addtime desc'
            var shop = await sql.db_mysql(sql_text, [req.session.user_id]);
            res.send({code: 1, data: shop})
        } catch (err) {
            console.log(err.message)
        }
    }
    , storageOut_handle: async function (req, res) {
        var handle = req.params.handle
            , goods_id = req.body.id
            , user_id = req.session.user_id
            , message = '保存成功';
        if (handle === 'set') {
            var num = req.body.num;
            await sql.db_mysql('UPDATE card  SET num=?,addtime=? where user=? and goodsid=? and type=2', [num, format(), user_id, goods_id]);
        } else {
            await sql.db_mysql('DELETE FROM card where user=? and goodsid=? and type=2', [user_id, goods_id]);
            message = '删除成功';
        }
        res.send({code: 1, msg: message})
    }
    , storageOut_clear: async function (req, res) {
        var a = await sql.db_mysql('DELETE FROM card where user=? and type=2', [req.session.user_id]);
        console.log(a);
        res.send({code: 1, msg: '已清空'})
    }
    , storageOut_submit: async function (req, res) {
        var user_id = req.session.user_id
            , time = format();
        var a = await sql.db_mysql(`select card.goodsid,card.num as shopNum,store.num,platform.name,platform.price,platform.img from card inner join platform on card.goodsid =platform.id inner join store on card.goodsid =store.goodsid and card.user=store.user WHERE card.user=${user_id} and card.type=2 ORDER BY card.addtime desc`)
        if (!a.length) {
            res.send({code: 2, msg: '购物车为空'});
            return;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i].shopNum > a[i].num) {
                res.send({code: 2, msg: '有库存不足的商品'});
                return;
            }
        }
        var sql_text1 = `UPDATE store INNER JOIN (SELECT goodsid,user,num FROM card WHERE type=2 and user=${user_id}) c 
                         SET store.num=store.num-c.num,store.nulltime= (CASE WHEN store.num-c.num=0 THEN '${time}' END)
                        WHERE c.goodsid=store.goodsid AND c.user=store.user`;
        await sql.db_mysql(sql_text1);
        await sql.db_mysql(`INSERT INTO record (goodsid,user,num,time,type) SELECT goodsid,user,num,'${time}',2 FROM card WHERE card.user=${user_id} and card.type=2`);
        await sql.db_mysql('DELETE FROM card where user=? and type=2', [user_id]);
        res.send({code: 1, msg: '提交成功'})

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