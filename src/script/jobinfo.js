/**
 * Created by lollipop on 2018/1/8
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle",
        "lodash": "lodash.min",
        "layer": "layer"
    }
});
require(['jquery', 'bundle', 'lodash', 'layer'], function ($, bundle, lodash, layer){
    // some code here
    //token
    // document.cookie = "CHYJRTGN_APP1=" + escape("5ED53C43A0D4DFE8D05D05AE2E1B5B57E19D534256418149450F00AEDCA86E86B0DDCAB78C77429E8C317EC352C4620DF83E5F86B889287367A5030CFCB54AFEE4770AC667346FB97E192F5B9914091A274069DF1E2D3445");//cookieName为要写入的Cookie的名称
    //tokenKey
    // document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FAAB992EF4E88185DCC82B4A71B8880EAA83388BE54553B66025850646AAE8039E1CD705E5DAFFCEC7D01F4DBCB4D3A116");//cookieName为要写入的Cookie的名称

    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");

    //jobid	职位id	Varchar	职位id
    //tag	职位查看标识	Varchar	Tag=p时调用职位查看推送接口，其他则不调用
    //type	更多职位推荐标识	Varchar	Type=0时显示更多职位，其他不显示


    const tag = bundle.getUrlParam("tag");
    const type = bundle.getUrlParam('type');
    const jobid = bundle.getUrlParam('jobid');
    const PR ="http://"+window.location.host+"/";
    const jobUrl = PR+"emobile/duty/jobinfo.html?jobid=";
    /*?jobid=950004*/

    if(tag == "p"){
        const jobinfoJson = {
            "head": {
                "transcode": "S013",
                "type": "h"
            },
            "data": {
                "jobid": jobid
            }
        };
        $.ajax({
            type: "POST",
            url: PR+"mobile2/api/jobinfo",
            contentType: "application/json",
            data: JSON.stringify(jobinfoJson),
            dataType: "json",
            success: function (data) {

            },
            error: function (data) {
                $("#loadingzzz").hide();
                layer.open({
                    content: data,
                    skin: 'msg',
                    style: 'font-size: 0.16rem',
                    shade: 'background-color: rgba(0,0,0,.3)',
                    time: 2
                });
            }
        });
    }

    const json = {
        "head": {
            "transcode": "H0011",
            "type": "h"
        },
        "data": {
            "jobid": jobid
        }
    };


    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/job",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        },
        success: function (data) {
            if(data.returnCode == "AAAAAAA") {
                $('#loadingzzz').hide();
                const corpInfo = data.data.corpInfo;
                /*{
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
                    "email": "51jrq@51jrq.com"
                }*/
                const {
                    corpid,	        //公司编号
                    corpname,	    //公司名称
                    city,	        //所在地
                    nature,	        //公司性质
                    scope,	        //公司规模
                    industry,	    //公司行业
                    address,	    //公司地址
                    email,	        //公司email
                    description,	//简介
                    site,	        //网站
                    mblog
                } = corpInfo;

                const jobInfo = data.data.jobInfo;
                /*{
                    "workyears": "十年以上",
                    "jobdescription": "职位描述：\r\n1、开拓维护当地高端客户，为客户做好资产配置，并提供投资建议；\r\n2、通过人脉、客户沙龙、商业合作，有效开拓新客户，提示客户转化率；\r\n3、持续做好客户维护工作，不断为高净值客户提供理财建议和服务，维护与客户长期良好关系。\r\n\r\n任职要求：\r\n1、金融、经济及相关专业本科以上学历（经验或资源丰富者可放宽），两年以上金融机构个人理财产品的销售工作经验；\r\n2、熟悉信托、银行、证券、知名第三方理财等金融相关行业；\r\n3、具备良好的沟通协调技巧、敏锐快捷的市场反应能力及较强的风险意识；\r\n4、品行端正，思维敏捷、严谨细致、踏实负责，具备较强的团队协作精神；\r\n5、具有良好的行业资源和客户资源者优先考虑；\r\n6、有AFP、CFP、CPB、证券、保险、基金、理财师等资格证书者优先。",
                    "corpid": "700022",
                    "sex": "不限",
                    "jobaddress": "上海",
                    "collectnum": 2,
                    "industry": "互联网高新",
                    "salary": "8k-10k",
                    "jobcategoryid": "理财经理/主管",
                    "jobtype": "全职",
                    "weal": [
                    "五险一金",
                    "员工旅游",
                    "绩效奖金",
                    "节日福利"
                    ],
                    "likenum": 38,
                    "seenum": 0,
                    "speciaid": "不限",
                    "jobid": 950004,
                    "number": "10",
                    "ebid": "大专",
                    "jobcity": "上海",
                    "department": "销售部",
                    "urgent": 0,
                    "jobname": "理财经理",
                    "age": "不限",
                    "status": "2",
                    "refreshdate": 1515391170000
                }*/
                const {
                    jobid,	            //职位ID	bigint(20)
                    // corpid, 	        //公司ID	varchar(20)
                    seenum,	            //查看该职位人数
                    likenum,	        //感兴趣该职位的人数（申请过该职位的人数）
                    collectnum,         // 收藏该职位的人数
                    jobname,	        //工作名称	varchar(100)
                    department,	        //部门	varchar(50)
                    // industry,	        //行业	varchar(20)
                    jobcategoryid,	    //职能类别	varchar(1024)
                    jobtype,	        //全职兼职实习	varchar(20)
                    salary,	            //薪资	varchar(20)
                    jobcity,	        //工作城市	varchar(50)
                    ebid,	            //学历	varchar(20)
                    workyears,	        //工作年限	varchar(20)
                    sex,	            //性别	varchar(20)
                    number,	            //招聘人数	varchar(50)
                    speciaid,	        //特别要求	varchar(50)
                    age,	            //年龄	varchar(50)
                    jobdescription,	    //工作简介	text
                    status,	            //状态	varchar(20)	1未发布（审核中）2发布中（审核通过）3已经暂停4 结束5审核未通过
                    urgent,	            //是否紧急	smallint(2)	1急 0非急
                    refreshdate,	    //刷新日期	datetime
                    jobaddress,
                    weal,
                } = jobInfo;

                $('#jobname').text(`${jobname ? jobname : '不详'}`);
                jobcity ? (
                    $('#posi_city').text(`${jobcity}`)
                ) : (
                    $('#posi_city').text('不详')
                );
                workyears ? (
                    $('#posi_workyears').text(`${workyears}`).prepend('<b>|</b>')
                ) : (
                    $('#posi_workyears').text('不详')
                );
                ebid ? (
                    $('#posi_edu').text(`${ebid}`).prepend('<b>|</b>')
                ) : (
                    $('#posi_edu').text('不详')
                );
                //规模
                scope ? $('#size').text(scope) : $('#size').text('不详');

                let wealRlt = '';
                if(wealRlt != null){
                    _.forEach(weal, (item, index) => {
                        wealRlt += `
                        <div class="inline-block">
                            ${item}
                        </div> 
                    `
                    });
                    $('#benifit').empty().append(wealRlt);
                } else {
                    $('#benifit').hide();
                }


                //工资
                salary ? $('#salary').text(salary) :  $('#salary').text('面议');

                //公司logo
                mblog ? (
                        $('#corp_logo').show().attr('src',mblog),
                            $('.corp-info .logo .mask').hide()
                    )
                    : $('#corp_logo').hide();

                //公司名称
                corpname ? $('#cor_name').text(corpname) : $('#cor_name').text('不详');

                //公司行业
                industry ? $('#industry').text(industry).prepend('<b>|</b>') : $('#industry').text('不详');

                //职位描述
                jobdescription ? $('.job-desc .desc').html(jobdescription.replace(/\n/g,'<br/>')) : $('.job-desc .desc').text('不详');

                //公司地址
                address ? $('.corp-addr .addr-info .addr-detail').text(address) : $('.corp-addr .addr-info .addr-detail').text('不详');

                //相关职位推荐
                if(type == 0){
                    const relatedJobs = data.relatedJobs;
                    let postbox = '';
                    if(relatedJobs != null) {
                        /*
                        "workyears": "一年以上",
                        "jobdescription": "1.开发客户\n\n2.服务客户",
                        "corpid": "1010060",
                        "headimg": "20161002012256975.png",
                        "nature": "合资(非欧美)",
                        "createdate": 1476556276000,
                        "mlogo": "http://www.51jrq.com/corpInfoDir/武汉民投80[20161010115143_mL8H9].png",
                        "salary": "8k-10k",
                        "jobtype": "全职",
                        "activeflag": "1",
                        "createby": "1070001",
                        "updatedate": 1476687547000,
                        "updateby": "sysadmin",
                        "_version_": 1589001288961490947,
                        "scope": "500-1000人",
                        "ebid": "不限",
                        "jobcity": "广州",
                        "corpname": "武汉民投金融服务有限公司",
                        "id": "1040005",
                        "urgent": 0,
                        "category": "客户经理",
                        "jobname": "理财经理",
                        "username": "陈先生",
                        "refreshdate": "2018-01-07"
                        */
                        _.forEach(relatedJobs, (item, index) => {
                            // console.log(item);
                            const {
                                workyears,
                                jobdescription,
                                corpid,
                                headimg,
                                nature,
                                createdate,
                                mlogo,
                                salary,
                                jobtype,
                                activeflag,
                                createby,
                                updatedate,
                                _version_,
                                scope,
                                ebid,
                                jobcity,
                                corpname,
                                id,
                                urgent,
                                category,
                                jobname,
                                username,
                                refreshdate
                            } = item;
                            postbox += `
                            <div class="postbox">
                                <a href="${jobUrl}${id}&type=0&tag=p">
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
                        })
                    }
                    $('.related-job').empty().append(postbox);
                } else {
                    $('.job-prom').hide();
                }
            } else {
                $('#loadingzzz').show();
                layer.open({
                    content: JSON.stringify(data.returnMsg),
                    skin: 'msg',
                    style: 'font-size: 0.16rem',
                    shade: 'background-color: rgba(0,0,0,.3)',
                    time: 2
                });
            }
        }
    })
});