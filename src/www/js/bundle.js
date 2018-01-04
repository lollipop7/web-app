/**
 * Created by lollipop on 2018/1/2
 */
/**
 获取cookie里面的参数
 */
define(function () {
    function getCookie(cookieName)
    {
        var arr,reg=new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    function getUrlParam(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }
    //Do setup work here
    return  {
        getCookie: getCookie,
        getUrlParam: getUrlParam
    }
});