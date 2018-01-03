/**
 * Created by lollipop on 2018/1/2
 */
/**
 * 获取页面url参数
 */
define(function () {
    function getUrlParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }
    //Do setup work here
    return  {
        getUrlParam: getUrlParam
    }
});