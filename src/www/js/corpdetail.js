/**
 * Created by lollipop on 2018/1/3
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle",
        "tinybox": "tinybox",
        "lodash": "lodash.min"
    }
});
require(['jquery', 'bundle', 'tinybox', 'lodash'], function ($, bundle, tinybox, lodash) {
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("5ED53C43A0D4DFE8D05D05AE2E1B5B57E19D534256418149450F00AEDCA86E86B0DDCAB78C77429E8C317EC352C4620DF83E5F86B889287367A5030CFCB54AFEE4770AC667346FB97E192F5B9914091A274069DF1E2D3445"); //cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FAAB992EF4E88185DCC82B4A71B8880EAA83388BE54553B66025850646AAE8039E1CD705E5DAFFCEC7D01F4DBCB4D3A116"); //cookieName为要写入的Cookie的名称

    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");

    //tag	职位查看标识	Varchar	Tag=p时调用职位查看推送接口，其他则不调用
    //type	更多职位推荐标识	Varchar	Type=0时显示更多职位，其他不显示
    const tag = bundle.getUrlParam("tag");
    const type = bundle.getUrlParam('type');
    const PR = "http://" + window.location.host + "/";
    const jobUrl = PR + "emobile/duty/jobinfo.html?jobid=";
    const corpid = bundle.getUrlParam('corpid');
    /*?corpid=700022&type=0&tag=p*/

    if (tag == "p") {
        const jobinfoJson = {
            "head": {
                "transcode": "S014",
                "type": "h"
            },
            "data": {
                "jobid": corpid
            }
        };
        $.ajax({
            type: "POST",
            url: PR + "mobile2/api/pushcorp",
            contentType: "application/json",
            data: JSON.stringify(jobinfoJson),
            dataType: "json",
            success: function (data) {},
            error: function (data) {
                TINY.box.show(JSON.stringify(data), 0, 0, 0, 0, 3);
            }
        });
    }

    const json = {
        "head": {
            "transcode": "H0050",
            "type": "h"
        },
        "data": {
            "corpid": corpid
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
                $('#loadingzzz').hide();
                const corpinfo = data.data.corpinfo;
                /*
                {
                    "mblog": "http://www.51jrq.com/corpInfoDir/logo-114[20160908091458_2GB5c].png",
                    "site": "http://www.51jrq.com",
                    "address": "上海浦东新区世纪大道1090号",
                    "corpid": 700022,
                    "city": "武汉",
                    "nature": "外资(欧美)",
                    "scope": "500-1000人",
                    "description": "51金融圈是专注互联网金融的招聘网站，以众多优质互联网资源为依托，发布圈内招聘信息，为求职者提供人性化、个性化、专业化的信息服务，以让优质人才和优秀企业及时相遇为己任。 我们是一个热爱互联网的年轻团队，我们用责任来做这件事情，致力于打造最专业的互联网招聘平台。\n。。",
                    "industry": "银行",
                    "corpname": "海擎金融信息技术服务（上海）有限公司",
                    "zambia": "5",
                    "email": "51jrq@51jrq.com"
                }
                */
                const {
                    mblog,
                    site,
                    address,
                    corpid,
                    city,
                    nature,
                    scope,
                    description,
                    industry,
                    corpname,
                    zambia,
                    email
                } = corpinfo;
                // 公司logo
                $('.corpdetail-page .corp-flag .logo').find('img').attr('src', mblog ? mblog : '../img/logo.png');

                //公司名称
                $('#corpname').text(corpname ? corpname : '不详');

                //公司城市
                $('#corp-city').text(city ? city : '不详');

                //公司规模
                $('#corp-scale').text(scope ? scope : '不详');

                //公司行业
                $('#corp-industry').text(industry ? industry : '不详');

                //公司简介
                description ? ($('#intro-brief').append(description.substr(0, 60)), $('#intro-brief').append(`<span class='intro-none'>${description.substr(60)}</span>`)) : $('#intro-brief').text('该公司还没有简介。');

                let isShowMore = true;
                $("#show-more").click(function () {
                    console.log(this);
                    $(".intro-none").slideToggle("show");
                    if (isShowMore) {
                        $("#show-more span").html("收起全部");
                        isShowMore = false;
                    } else {
                        $("#show-more span").html("显示全部");
                        isShowMore = true;
                    }
                });

                //公司地址
                $('.corp-addr .addr-info .addr-detail').text(address ? address : '不详');

                //相关职位推荐
                if (type == 0) {
                    $("#loadingzzz").hide();
                    const jobmap = data.data.jobmap;
                    let postbox = '';
                    if (jobmap != null) {
                        _.forEach(jobmap, (item, index) => {
                            /*
                            {
                                "jobid": 1130002,
                                "workyears": "二年以上",
                                "headimg": "http://192.168.1.251:6688/images/headimg/touxiang_nan.png",
                                "ebid": "本科",
                                "createdate": 1487868033000,
                                "jobcity": "上海",
                                "salary": "50k-100k",
                                "jobname": "投资总监",
                                "refreshdate": "2018-01-09",
                                "username": "HR"
                            }
                            */
                            const {
                                jobid,
                                workyears,
                                headimg,
                                ebid,
                                createdate,
                                jobcity,
                                salary,
                                jobname,
                                refreshdate,
                                username
                            } = item;
                            postbox += `
                            <div class="postbox">
                                <a href="${jobUrl}${jobid}&type=0&tag=p">
                                    <h2 >
                                       <span class="postname">
                                            ${jobname ? jobname : '不详'}
                                       </span>
                                    </h2>
                                    <div class="corpname">
                                        ${corpname ? corpname : '不详'}
                                    </div>
                                    <div class="post-info">
                                        <span class="post-city">
                                            ${jobcity ? jobcity : '不详'}
                                        </span>
                                        <b>|</b>
                                        <span class="post-workyears">
                                            ${workyears ? workyears : '不限'}
                                        </span>
                                        <b>|</b>
                                        <span class="post-edu">
                                            ${ebid ? ebid : '不限'}
                                        </span>
                                    </div>
                                    <div class="salary">
                                        ${salary ? salary : '面议'}
                                    </div> 
                                </a>
                            </div>     
                        `;
                        });
                    }
                    $('.related-job').empty().append(postbox);
                } else {
                    $('.corp-posts').hide();
                }

                //公司视频信息
                const videolist = data.data.videolist;
                if (videolist.length == 0) {
                    $('.corp-video').hide();
                } else if (videolist.length != 0) {
                    $('.corp-video').show();
                }
            } else {
                $('#loadingzzz').show();
                TINY.box.show(JSON.stringify(data.returnMsg), 0, 0, 0, 0, 3);
            }
        }
    });
});