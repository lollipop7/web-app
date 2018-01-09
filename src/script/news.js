/**
 * Created by lollipop on 2018/1/4
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle"
    },
    shim: {
        "moment": {
            exports: "moment"
        }
    }
});



require(['jquery', 'bundle', 'moment'], function ($, bundle, moment){
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("E458BD3B260FB31485BB8BC07C9D8400741B232B2D53AF2CDC357750D3AD102C50C7B4E016D98C9E7EFD3DC5806B82F395279F5966B16340BFEF6CD725F1F332175D3ACF92A9941E7882C22EC2E02173875E0628FC03577D");//cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA39A6B23F6B25ECCE22BC1C2AED9FB07EB99669FEFDA9EB83DEA97C7B906C81217253D740C37E8976E9A48D1ECD91D5C5");//cookieName为要写入的Cookie的名称
    //地址栏参数
    const PR ="http://"+window.location.host+"/";
    const newsUrl = PR+"emobile/duty/news.html?id=21801"

    //获取企业版传过来的token 和tokenkey

    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");


    const id = bundle.getUrlParam('id');

    const json = {
        "head": {
            "transcode": "F000003",
            "type": "h"
        },
        "data": {
            "id":id
        }
    }



    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/ai/getNews",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        },
        success: function (data) {
            if(data.returnCode == "AAAAAAA") {
                $('#loadingzzz').hide();
                //标题
                const title = data.list.title;
                $('.news-page .news-header').find('h2').text(title);

                //来源
                const source = data.list.source;
                $('.news-page .news-header').find('.news-illus .source').text(source);

                //创建时间
                const createdate = data.list.createdate;
                const time = moment(createdate).format('YYYY-MM-DD');
                $('.news-page .news-header').find('.news-illus .time').text(time);
                //图文内容
                const mobile_text = data.list.mobile_text;
                $('.news-page .news-arcticle .inner-box').html(mobile_text);
            }else {
                $('#loadingzzz').show();
                TINY.box.show(JSON.stringify(data.returnMsg),0,0,0,0,3);
            }
        }
    })
});

