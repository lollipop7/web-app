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
require(['jquery', 'lodash', 'getCookie', 'getUrlParam'], function ($, _, getCookie, getUrlParam) {
    // some code here
    document.cookie = "CHYJRTGN_APP1=" + escape("E6A77CE527FFAF63C3EEBF428C3351973A03FE6E4DCC27B49D42AF8AF096F2FE8CEC75826A9C5764772355A4C04E1BC3D92418E5361D7311E6FE89E5CC55F8ED80C803648A461B2305F27B6D0E8DCB959266B5888AE3BA00"); //cookieName为要写入的Cookie的名称
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA84898F6A2855B402AF4FE59F91D05746FAD7C16455CC6E4475356FDEAC6A4E458B83A7648FF2B31C7BA718C124E06CC6"); //cookieName为要写入的Cookie的名称
    token = getCookie.getCookie("CHYJRTGN_APP1");
    tokenKey = getCookie.getCookie("CacheKey_APP1");

    console.log(token, tokenKey);

    var testJson = {
        "head": {
            "transcode": "H0016",
            "type": "h"
        },
        "data": {
            "token": token,
            "tokenKey": tokenKey,
            "resumeid": "10000003"
        }
    };

    PR = "http://" + window.location.host;
    // PR = "http://192.168.1.251:6688/";

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/pinfodetail",
        data: JSON.stringify(testJson),
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data && data.resumebase) {
                // 头部
                $('.profile').css({
                    'background-image': 'url(' + data.resumebase.headimg + ')',
                    'background-position': 'center'
                });
                $('#candiname').text(data.resumebase.username);
                $('#candi-crop').text(data.resumebase.companynow);
                $('#candi-posi').text(data.resumebase.titlenow);
                $('.cur-sta span').text(data.resumebase.jobstatus);
                $('.work-exp span').text(data.resumebase.workyears);
                $('.location span').text(data.resumebase.livecityid);
                $('.location span').text(data.resumebase.livecityid);
                // 自我评价
                $('.evalu-box').empty().append("<p>" + data.resumebase.selfRemark + "</p>");
                // 工作经验
                var experReuslt = "";
                JSON.parse(data.workdata).forEach(function (item, index) {
                    experReuslt += `<div class='exper-box'><div class='exper-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.starttime}</span></div> <h3 class='corp-name'>${item.corpname}</h3><div class='job-posi'>${item.postcode}</div><div class='exper-content'><p>${item.workremark}</p></div></div>`;
                });
                $('.exper-box').remove();
                $('#myexper').append(experReuslt);
                // 教育经历
                var eduReuslt = "";
                JSON.parse(data.edudata).forEach(function (item, index) {
                    eduReuslt += `<div class='edu-box'><div class='school-name'>${item.school}</div><div class='edu-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.endtime}</span></div><div class='edu-info'><span class='profess'>${item.specialtyid}</span><b>|</b><span class='degree'>${item.educationbg}</span></div></div>`;
                });
                $('.edu-box').remove();
                $('#myedu').append(eduReuslt);
                // 证书
                var cerReuslt = "";
                console.log(JSON.parse(data.cerdata));
                JSON.parse(data.cerdata).forEach(function (item, index) {
                    cerReuslt += `<div class='credits-box'><div class='credits-name'>${item.certname}</div><div class='credits-time'><span class='from'>${item.gaintime}</span><span>颁发</span></div><div class='fromplace'><label>颁发机构</label><i>：</i><span>${item.certname}</span></div></div>`;
                });
                $('.credits-box').remove();
                $('#mycer').append(cerReuslt);
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });
});