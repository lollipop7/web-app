/**
 * Created by lollipop on 2018/1/5
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
    document.cookie = "CHYJRTGN_APP1=" + escape("048B8A226BE07D9BA24B07C5C462B60221C48E17B59540A97CDF0BFBE8CAE71E4827008242F9BD0B4B10DC30D909FF7C174F1DEE1FB6259A2CA5FFF5D8EE4D34821BE0BB8865E9C95CF1C0EE9B4C1964AA57250986306920");//cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FABB50B229214546DB0D7B8EEC09493B67268A488F93959510A95FEFDE76264BD05B7584D747546CE252AF5D2BF03F714B");//cookieName为要写入的Cookie的名称

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
            "token":token,
            "tokenKey":tokenKey,
            "jobid":"42",
            "PhxID":"p1570002"
        }
    }


    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/sendInterview",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        },
        success: function (data) {
            console.log(data)
            if(data.returnCode == "AAAAAAA") {
                $('#loadingzzz').hide();
                const {
                    jobtitle,   //企业用户的职位
                    cusername,  //企业用户姓名
                    jobname,    //招聘职位名称
                    workyears,  //职位要求工作经验
                    ebid,       //职位要求学历
                    salary,     //职位薪资
                    jobcity,    //工作城市
                    corpname,	//公司名称
                    industry,	//公司行业
                    headimg,	//头像
                    pusername,	//应聘者姓名
                } = data.data;

                const jobRlt = `
                    <header>
                    <h2 >
                    <span id="jobname">
                        ${jobname ? jobname : '不详'}
                    </span>
                    </h2>
                </header>
                <div class="posi-info">
                    <span id="posi-city">
                        ${jobcity ? jobcity : '不详'}
                    </span>
                    <b>|</b>
                    <span id="posi-section">
                        <!--浦东新区-->
                    </span>
                    <b>|</b>
                    <span id="posi-workyears">
                        ${workyears ? workyears : '不详'}
                    </span>
                    <b>|</b>
                    <span id="posi-edu">
                        ${ebid ? ebid : '不详'}
                    </span>
                </div>
                <div id="benifit" class="benifit">
                    <div class="inline-block">
                        <!--五险一金-->
                    </div>
                    <div class="inline-block">
                        <!--弹性工作-->
                    </div>
                    <div class="inline-block">
                        <!--班车-->
                    </div>
                    <div class="inline-block">
                        <!--带薪年假-->
                    </div>
                </div>
                <div id="salary" class="salary">
                    ${salary ? salary : '不详'}
                </div>
                `
                $('#jobname').text(`${jobname ? jobname : '不详'}`);
                $('#posi_city').text(`${jobcity ? jobcity : '不详'}`);
                $('#posi_section').text('')
            }else {
                $('#loadingzzz').show();
            }
        }
    })
});