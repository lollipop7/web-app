/**
 * Created by lollipop on 2018/1/3
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle"
    }
});
require(['jquery', 'bundle'], function ($, bundle){
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("E458BD3B260FB31485BB8BC07C9D8400741B232B2D53AF2CDC357750D3AD102C50C7B4E016D98C9E7EFD3DC5806B82F395279F5966B16340BFEF6CD725F1F332175D3ACF92A9941E7882C22EC2E02173875E0628FC03577D");//cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA39A6B23F6B25ECCE22BC1C2AED9FB07EB99669FEFDA9EB83DEA97C7B906C81217253D740C37E8976E9A48D1ECD91D5C5");//cookieName为要写入的Cookie的名称

    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");

    console.log(token, tokenKey);
    const corpid = bundle.getUrlParam('corpid');
    console.log(corpid,bundle);
    const json = {
        "head": {
            "transcode": "H0050",
            "type": "h"
        },
        "data": {
            "corpid":"950020"
        }
    }



    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/corpinfo",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        },
        success: function (data) {
            if(data.returnCode == "AAAAAAA") {
                const corpinfo = data.data.corpinfo;
                // 公司logo
                console.log(corpinfo.mblog)
                if(!(typeof(corpinfo.mblog) == undefined)){
                    $('.corpdetail-page .corp-flag .logo').append(
                        `<img src=${corpinfo.mblog} alt="图片">`
                    )
                }
                //公司视频信息
                const videolist = data.data.videolist;
                console.log(videolist);
                if(videolist.length == 0) {
                    $('.corp-video').hide();
                }else if (videolist.length != 0){
                    $('.corp-video').show();
                }
            }
        }
    })
});