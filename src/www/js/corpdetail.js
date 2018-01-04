/**
 * Created by lollipop on 2018/1/3
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "lodash": "lodash.min",
        "bundle": "bundle"
    }
});
require(['jquery', 'lodash', 'bundle'], function ($, _, bundle) {
    // some code here
    document.cookie = "CHYJRTGN_APP1=" + escape("E6A77CE527FFAF63C3EEBF428C3351973A03FE6E4DCC27B49D42AF8AF096F2FE8CEC75826A9C5764772355A4C04E1BC3D92418E5361D7311E6FE89E5CC55F8ED80C803648A461B2305F27B6D0E8DCB959266B5888AE3BA00"); //cookieName为要写入的Cookie的名称
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA84898F6A2855B402AF4FE59F91D05746FAD7C16455CC6E4475356FDEAC6A4E458B83A7648FF2B31C7BA718C124E06CC6"); //cookieName为要写入的Cookie的名称
    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");

    console.log(token, tokenKey);
    const corpid = bundle.getUrlParam('corpid');
    console.log(corpid, bundle);
    const json = {
        "head": {
            "transcode": "H0050",
            "type": "h"
        },
        "data": {
            "corpid": "950020"
        }
    };

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/corpinfo",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        },
        success: function (data) {
            if (data.returnCode == "AAAAAAA") {
                const corpinfo = data.data.corpinfo;
                // 公司logo
                console.log(corpinfo.mblog);
                if (!(typeof corpinfo.mblog == undefined)) {
                    $('.corpdetail-page .corp-flag .logo').append(`<img src=${corpinfo.mblog} alt="图片">`);
                }
                //公司视频信息
                const videolist = data.data.videolist;
                console.log(videolist);
                // if(videolist.length == 0) {
                //     $('.corp-video .no-video').show();
                //     $('.corp-video .video-wrap').hide();
                // }else if (videolist.length != 0){
                //     $('.corp-video .no-video').hide();
                //     $('.corp-video .video-wrap').show();
                // }
            }
        }
    });
});