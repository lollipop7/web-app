/**
 * Created by lollipop on 2018/1/3
 */
/**
 * Created by lollipop on 2018/1/2
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "lodash": "lodash.min",
        "getCookie": "getCookie",
        "getUrlParam": "getUrlParam"
    }
});
require(['jquery', 'lodash', 'getCookie', 'getUrlParam'], function ($, _, getCookie, getUrlParam){
    // some code here
    document.cookie = "CHYJRTGN_APP1=" + escape("E6A77CE527FFAF63C3EEBF428C3351973A03FE6E4DCC27B49D42AF8AF096F2FE8CEC75826A9C5764772355A4C04E1BC3D92418E5361D7311E6FE89E5CC55F8ED80C803648A461B2305F27B6D0E8DCB959266B5888AE3BA00");//cookieName为要写入的Cookie的名称
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA84898F6A2855B402AF4FE59F91D05746FAD7C16455CC6E4475356FDEAC6A4E458B83A7648FF2B31C7BA718C124E06CC6");//cookieName为要写入的Cookie的名称
    token = getCookie.getCookie("CHYJRTGN_APP1");
    tokenKey = getCookie.getCookie("CacheKey_APP1");

    console.log(token, tokenKey);

    var testJson = {
        "head": {
            "transcode": "H0023",
            "type": "h"
        },
        "data": {
            "token":token,
            "tokenKey":tokenKey
        }
    }

    PR ="http://"+window.location.host;
    // PR = "http://192.168.1.251:6688/";

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/selnews",
        // contentType: "application/json",
        data: JSON.stringify(testJson),
        dataType: "json",
        success: function (data) {
            console.log(data)
        },
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        }
    })
});