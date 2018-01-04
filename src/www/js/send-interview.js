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

require(['jquery', 'bundle', 'moment'], function ($, bundle, moment) {
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("E458BD3B260FB31485BB8BC07C9D8400741B232B2D53AF2CDC357750D3AD102C50C7B4E016D98C9E7EFD3DC5806B82F395279F5966B16340BFEF6CD725F1F332175D3ACF92A9941E7882C22EC2E02173875E0628FC03577D"); //cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA39A6B23F6B25ECCE22BC1C2AED9FB07EB99669FEFDA9EB83DEA97C7B906C81217253D740C37E8976E9A48D1ECD91D5C5"); //cookieName为要写入的Cookie的名称

    //获取企业版传过来的token 和tokenkey

    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");
    //职位编号
    const jobid = bundle.getUrlParam('jobid');
    //应聘者环信id
    const PhxID = bundle.getUrlParam('PhxID');

    const json = {
        "head": {
            "transcode": "H0072",
            "type": "h"
        },
        "data": {
            "token": token,
            "tokenKey": tokenKey,
            "jobid": "42",
            "PhxID": "p1570002"
        }
    };

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/sendInterview",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        },
        success: function (data) {
            // console.log(data)
            if (data.returnCode == "AAAAAAA") {
                $('#loadingzzz').hide();
                const {
                    jobtitle, //企业用户的职位
                    cusername, //企业用户姓名
                    jobname, //招聘职位名称
                    workyears, //职位要求工作经验
                    ebid, //职位要求学历
                    salary, //职位薪资
                    jobcity, //工作城市
                    corpname, //公司名称
                    industry, //公司行业
                    headimg, //头像
                    pusername //应聘者姓名
                } = data.data;
                console.log(industry);
            } else {
                $('#loadingzzz').show();
            }
        }
    });
});