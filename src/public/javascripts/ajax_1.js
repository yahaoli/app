layui.define(['layer', 'jquery'], function () {
    var layer = layui.layer,
        $ = layui.$;
    window.common_ = {
        ajax_: function (json,load) {
            var width=$(window).width()/2+100;
            load?layer.load(1,{offset: ['50%',width]}):'';
            var def = $.Deferred();
            $.ajax(json).then(function (data) {
                load?layer.closeAll('loading'):'';
                if (data.code !== 1) {
                    layer.msg(data.msg);
                    def.reject()
                }
                def.resolve(data)
            }, function (err) {
                load?layer.closeAll('loading'):'';
                layer.msg("请求失败");
                def.reject()
            });
            return def.promise();
        },
        setNum:function (data) {
            var a=data?data:'无';
            return a
        }
    };
});