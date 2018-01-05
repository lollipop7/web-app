/**
 * Created by lollipop on 2018/1/4
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle",
        "lodash": "lodash.min",
        "date": "date",
        "iscroll": "iscroll"
    },
    shim: {
        "moment": {
            exports: "moment"
        }
    }
});

require(['jquery', 'bundle', 'moment', 'lodash', 'iscroll', 'date'], function ($, bundle, moment, lodash, iscroll, date) {
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("048B8A226BE07D9BA24B07C5C462B60221C48E17B59540A97CDF0BFBE8CAE71E4827008242F9BD0B4B10DC30D909FF7C174F1DEE1FB6259A2CA5FFF5D8EE4D34821BE0BB8865E9C95CF1C0EE9B4C1964AA57250986306920"); //cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FABB50B229214546DB0D7B8EEC09493B67268A488F93959510A95FEFDE76264BD05B7584D747546CE252AF5D2BF03F714B"); //cookieName为要写入的Cookie的名称

    //获取企业版传过来的token 和tokenkey

    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");
    //职位编号
    const jobid = bundle.getUrlParam('jobid');
    //应聘者环信id
    const PhxID = bundle.getUrlParam('PhxID');

    //发送面试邀请
    const sendInterviewJson = {
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
        data: JSON.stringify(sendInterviewJson),
        dataType: "json",
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        },
        success: function (data) {
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

                $('#jobname').text(`${jobname ? jobname : '不详'}`);

                jobcity ? $('#posi_city').text(`${jobcity}`) : $('#posi_city').text('不详');
                workyears ? $('#posi_workyears').text(`${workyears}`).prepend('<b>|</b>') : $('#posi_workyears').text('不详');
                ebid ? $('#posi_edu').text(`${ebid}`).prepend('<b>|</b>') : $('#posi_edu').text('不详');
                //规模
                const scope = data.scope;
                scope ? $('#size').text(scope) : $('#size').text('不详');

                //福利
                const weal = data.weal;
                let wealRlt = '';
                _.forEach(weal, (item, index) => {
                    wealRlt += `
                        <div class="inline-block">
                            ${item}
                        </div> 
                    `;
                });
                $('#benifit').empty().append(wealRlt);

                //工资
                salary ? $('#salary').text(salary) : $('#salary').text('面议');

                //公司logo
                headimg ? ($('#corp_logo').show().attr('src', headimg), $('.corp-info .logo .mask').hide()) : $('#corp_logo').hide();

                //公司名称
                corpname ? $('#cor_name').text(corpname) : $('#cor_name').text('不详');

                //公司行业
                industry ? $('#industry').text(industry).prepend('<b>|</b>') : $('#industry').text('不详');
            } else {
                $('#loadingzzz').show();
            }
        }
    });

    function saveIterview() {
        //职位编号
        const jobid = $("#jobid").val();
        //应聘者环信id
        const PhxID = $("#PhxID").val();
        //职位名称
        const jobname = $("#jobname").text();
        //面试时间
        const interviewtime = $("#endTime").val();
        //联系电话
        const cphone = $("#cphone").val();
        //面试地点
        const address = $("#address").val();
        //备注说明
        const remarks = $("#remarks").val();

        //保存面试邀请
        const saveInterviewJson = {
            "head": {
                "transcode": "H0070",
                "type": "h"
            },
            "data": {
                "token": token,
                "tokenKey": tokenKey,
                "jobid": jobid,
                "PhxID": PhxID,
                "jobname": jobname,
                "interviewtime": interviewtime,
                "cphone": cphone,
                "address": address,
                "remarks": remarks
                // "PhxID":"p2150001",
                // "jobid":"42",
                // "jobname":"投融资总监",
                // "interviewtime":"2016-10-17 8:00",
                // "cphone":"15502126008",
                // "address":"上海市浦东新区陆家嘴软件园",
                // "remarks":"请准时前来面试"
            }
        };

        const PR = "http://" + window.location.host + "/";
        $.ajax({
            type: "POST",
            url: PR + "emobile/api/hr/saveInterview",
            contentType: "application/json",
            data: JSON.stringify(saveInterviewJson),
            dataType: "json",
            success: function (data) {
                if (data.returnCode == "AAAAAAA") {
                    var str = "{\"data\":{\"corpname\":\"" + data.data.corpname + "\",\"address\":\"" + data.data.address + "\",\"interviewtime\":\"" + data.data.interviewtime + "\",\"inteid\":\"" + data.data.inteid + "\"}}";
                    window.location.href += "&" + str;
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            }
        });
    }

    $('.saveIterview').click(function () {
        saveIterview();
    });

    //字数限制
    $('.oText').bind('input propertychange', function () {
        var len = $(this).val().length;
        if (len < 100) {
            $('.oSpan em').html(len);
        } else {
            var limit = $(this).val().substring(0, 100);
            $('.oText').val(limit);
            $('.oSpan em').html('100');
        }
    });

    $(function () {
        $('#beginTime').date();
        $('#endTime').date({ theme: "datetime" });
    });
});