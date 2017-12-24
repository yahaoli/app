layui.define(['jquery'], function () {
    var $ = layui.$;
    $('.table-size').height(parseInt($(window).height())-190+'px');
    $(window).on('resize',function () {
        $('.table-size').height(parseInt($(window).height())-190+'px')
    })
})