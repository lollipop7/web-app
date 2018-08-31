/**
 * Created by lollipop on 2018/1/3
 */
/**
 * Created by lollipop on 2018/1/2
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle",
        "lodash": "lodash.min",
        "layer": "layer"
    }
});
require(['jquery', 'lodash', 'bundle', 'layer'], function ($, _, bundle, layer) {
    // some code here
    //token
    document.cookie = "CHYJRTGN_APP1=" + escape("5D9F35D828030F45F8590FA76E797E47B49DCCA2D8B8B61C2066F83ADA682A7A3BFDFAA71F6F1E4855C17283ABF1BAA5E23BE4EFF16CB8C11120A0B43B32AA7056F0B2EC35602581B7A8398E748AD68FBEBC6E59A62BD714");//cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("2BD9B7565C257486FFCB3EA697DA5FACBC131875AAFB01BF55A80000352414598D58C9842C267B5682DD4412772525E122B526FFB8A06753");//cookieName为要写入的Cookie的名称

    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");
    // 获取resumeId
    let pattern1 = /resumeid=[0-9]+/g;
    let matches1 = pattern1.exec(location.search);
    let resumeid = matches1[0].split("=")[1];
    let pattern2 = /type=[0-9]+/g;
    let matches2 = pattern2.exec(location.search);
    let type = matches2[0].split("=")[1];


    PR = "http://" + window.location.host;
    // PR = "http://192.168.1.251:6688/";
    let url = type==1 ? "/emobile/api/hr/pinfodetail" : "/emobile/api/hr/resumeview";
    let transcode = type==1 ? "H0016" : "JZ00002";

    const json = {
        "head": {
            "transcode": transcode,
            "type": "h"
        },
        "data": {
            "token": token,
            "tokenKey": tokenKey,
            "resumeid": resumeid
        }
    };

    // 隐藏手机，邮箱
    $('.mobile, .email').hide();

    if(type==1){
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(json),
            dataType: "json",
            success: function (data) {
                if (data.returnCode == "AAAAAAA") {
                    $('#loadingzzz').hide();
                    const {
                        userid,	        //用户编号
                        username,	    //用户名称
                        salary,	        //薪资·要求
                        livecityid,	    //城市
                        workyears,	    //工作年限
                        educationbg,    //学历
                        headimg,	    //头像地址
                        titlenow,	    //目前职位
                        companynow,	    //目前公司
                        selfRemark,	    //个人评价		当前接口没有该数据
                        joblb,	        //期望行业
                        updatedate,	    //更新时间		更新时间
                        phone,	        //手机号码		当islock为1时有数据，为0时没有数据
                        email,	        //邮箱		当islock为1时有数据，为0时没有数据
                        jobstatus,      //工作状态		工作状态
                        islock,	        //是否查看该简历		0 未查看 1  以查看
                        jobNature,      //全职/兼职
                        postsTime,      //到岗时间
                        marital         //婚姻状况
                    } = data.resumebase; //简历基本信息
                    // 头部
                    $('.profile').css({
                        'background-image': 'url(' + headimg + ')',
                        'background-position': 'center'
                    })
                    $('#candiname').text(username ? username : '不详');
                    $('#candi-crop').text(companynow ? companynow : '不详');
                    $('#candi-posi').text(titlenow ? titlenow : '不详');

                    $('.cur-sta span').text(jobstatus ? jobstatus : '不详');
                    $('.work-exp span').text(workyears ? workyears : '不详');
                    $('.location span').text(livecityid ? livecityid : '不详');
                    //户口 去掉
                    //婚姻
                    $('.marital-sta span').text(marital ? marital : '不详');
                    $('.mobile span').text(phone ? phone : '不详');
                    $('.email span').text(email ? email : '不详');

                    /*求职意向*/
                    $('.job-prefe .posi').text(titlenow ? titlenow : '不详');
                    $('.job-prefe .industry').text(joblb ? joblb : '不详');
                    $('.job-prefe .job-type').text(jobNature ? jobNature : '不详');
                    $('.job-prefe .location').text(livecityid ? livecityid : '不详');
                    $('.job-prefe .salary').text(salary ? salary : '不详');
                    $('.job-prefe .duty-time').text(postsTime ? postsTime : '不详');


                    // 自我评价
                    selfRemark ? (
                        $('.evalu-box').empty().append("<p>" + selfRemark + "</p>")
                    ) : (
                        $('.evalu-box').empty().append('暂无')
                    );

                    const {
                        videodata,  //简历视频信息
                        workdata,   //工作经历
                        prodata,    //项目经验
                        edudata,    //教育经历
                        cerdata,    //证书
                        landata,    //语言能力
                        tradata,    //培训能力
                        othdata,    //附加信息
                        higdata,    //高级人才附加信息
                    } = data;

                    // 工作经验
                    let experReuslt = "";
                    if(workdata != null){
                        _.forEach(JSON.parse(workdata),function(item,index){
                            experReuslt += `<div class='exper-box'><div class='exper-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.endtime}</span></div> <h3 class='corp-name'>${item.corpname}</h3><div class='job-posi'>${item.postcode}</div><div class='exper-content'><p>${item.workremark}</p></div></div>`
                        });
                        $('.exper-box').remove();
                        $('#myexper').append(experReuslt);
                    }

                    // 项目经验
                    let proReuslt = "";
                    if(prodata != ""){
                        _.forEach(JSON.parse(prodata),function(item,index){
                            proReuslt += `<div class="prog-box"><div class="prog-name">${item.projectname}</div><div class="proj-time"><span class="from">${item.starttime}</span> <b>-</b> <span class="to">${item.endtime}</span></div> <div class="proj-content"><p>${item.projectremark}</p></div></div>`
                        });
                        $('.prog-box').remove();
                        $('#mypro').append(proReuslt);
                    }

                    // 教育经历
                    let eduReuslt = "";
                    if(eduReuslt != null){
                        _.forEach(JSON.parse(edudata),function(item,index){
                            eduReuslt += `<div class='edu-box'><div class='school-name'>${item.school}</div><div class='edu-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.endtime}</span></div><div class='edu-info'><span class='profess'>${item.specialtyid}</span><b>|</b><span class='degree'>${item.educationbg}</span></div></div>`
                        });
                        $('.edu-box').remove();
                        $('#myedu').append(eduReuslt);
                    }

                    // 证书
                    let cerReuslt = "";
                    if(cerdata != null){
                        JSON.parse(cerdata).forEach(function(item,index){
                            cerReuslt += `<div class='credits-box'><div class='credits-name'>${item.certname}</div><div class='credits-time'><span class='from'>${item.gaintime}</span><span>颁发</span></div><div class='fromplace'><label>颁发机构</label><i>：</i><span>${item.certname}</span></div></div>`
                        });
                        $('.credits-box').remove();
                        $('#mycer').append(cerReuslt);
                    }

                    //查看联系方式点击事件
                    $('.look').click(function () {
                        const lockresume = {
                            "head": {
                                "transcode": "H0041",
                                "type": "h"
                            },
                            "data": {
                                "token": token,
                                "tokenKey": tokenKey,
                                "resumeid": resumeid
                            }
                        };
                        $.ajax({
                            type: "POST",
                            url: "/emobile/api/hr/lockresume",
                            contentType: "application/json",
                            data: JSON.stringify(lockresume),
                            dataType: "json",
                            success: function (data) {
                                if((data.returnCode=='AAAAAAA')){
                                    $('.mobile, .email').show();
                                    $(".look").hide();
                                }else{
                                    $('.mobile, .email').hide();
                                    $(".look").show();
                                    layer.open({
                                        content: data.returnMsg,
                                        skin: 'msg',
                                        style: 'font-size: 0.16rem',
                                        className: 'popup',
                                        shade: 'background-color: rgba(0,0,0,.3)',
                                        time: 2
                                    });
                                }
                            },
                            error: function (data) {
                                $('.mobile, .email').hide();
                                $(".look").show();
                                layer.open({
                                    content: data,
                                    skin: 'msg',
                                    style: 'font-size: 0.16rem',
                                    className: 'popup',
                                    shade: 'background-color: rgba(0,0,0,.3)',
                                    time: 2
                                });
                            }
                        });
                    })
                }else {
                    $('#loadingzzz').show();
                    layer.open({
                        content: JSON.stringify(data.returnMsg),
                        skin: 'msg',
                        style: 'font-size: 0.16rem',
                        shade: 'background-color: rgba(0,0,0,.3)',
                        time: 2
                    });
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr, status, error)

            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(json),
            dataType: 'json',
            success: function(data){
                if (data.returnCode == "AAAAAAA"){
                    $('#loadingzzz').hide();
                    let {
                        currentArea, //城市
                        workedYearsMeanly,  //工作年限
                        lastSchool, // 学历
                        headimg,// 头像地址 该接口没有此字段
                        lastPosition,   //目前职位
                        lastCompany,    //目前公司
                        personal,   //个人评价
                        expectIndustries,   //期望行业
                        expectPositions,    //期望职位
                        expectAreas,    //期望城市
                        resumeLastUpdate,   //更新时间
                        workStatus, //工作状态
                        workType,   //全职/兼职
                        arrivalTime,    //到岗时间
                        marryState, //婚姻状况
                        name,   //用户名称
                        expectSalary,   //薪资·要求
                        sex,    //性别
                    } = data.data.resumeinfo,
                    {
                        isView  //是否查看该简历
                    } = data.data;
                    contact = data.data.resumeinfo.contact !=null ? data.data.resumeinfo.contact : {};
                    let {
                        mobile,  //手机号码
                        email,   //邮箱
                    } = contact ;
                    // 头部
                    let headuri = headimg ? headimg : "";

                    switch(sex){
                        case 0:
                            headuri = headuri ? headuri : '/img/touxiang_nv.png'; break;
                        case 1:
                            headuri = headuri ? headuri : '/img/touxiang_nan.png'; break;
                    }
                    $('.profile').css({
                        'background-image': 'url(' + headuri + ')',
                        'background-position': 'center'
                    });
                    $('#candiname').text(name ? name : '不详');
                    $('#candi-crop').text(lastCompany ? lastCompany : '不详');
                    $('#candi-posi').text(lastPosition ? lastPosition : '不详');

                    $('.cur-sta span').text(workStatus ? workStatus : '不详');
                    $('.work-exp span').text(workedYearsMeanly ? workedYearsMeanly : '不详');
                    $('.location span').text(currentArea ? currentArea : '不详');
                    //户口 去掉
                    //婚姻
                    let marryTxt = '';
                    switch(marryState){
                        case 0:
                            marryTxt = '未婚'; break;
                        case 1:
                            marryTxt = '已婚'; break;
                        case 2:
                            marryTxt = '离异'; break;
                        case 3:
                            marryTxt = '保密'; break;
                        default:
                            marryTxt = '';
                    }

                    $('.marital-sta span').text(marryTxt ? marryTxt : '不详');
                    $('.mobile span').text(mobile ? mobile : '不详');
                    $('.email span').text(email ? email : '不详');

                    /*求职意向*/
                    $('.job-prefe .posi').text(expectPositions ? expectPositions : '不详');
                    $('.job-prefe .industry').text(expectIndustries ? expectIndustries : '不详');
                    $('.job-prefe .job-type').text(workType ? workType : '不详');
                    $('.job-prefe .location').text(expectAreas ? expectAreas : '不详');
                    $('.job-prefe .salary').text(expectSalary ? expectSalary : '不详');
                    $('.job-prefe .duty-time').text(arrivalTime ? arrivalTime : '不详');

                    // 自我评价
                    console.log(personal)
                    personal ? $('.evalu-box').empty().append("<p>" + personal + "</p>") : $('.evalu-box').empty().append('暂无');

                    const {
                        videodata, //简历视频信息
                        workExpList, //工作经历
                        projectExpList, //项目经验
                        educationExpList, //教育经历
                        cerdata, //证书 该接口没有此字段
                        landata, //语言能力 该接口没有此字段
                        tradata, //培训能力 该接口没有此字段
                        othdata, //附加信息 该接口没有此字段
                        higdata //高级人才附加信息 该接口没有此字段
                    } = data.data.resumeinfo;

                    // 工作经验
                    let experReuslt = "";
                    if (workExpList != null) {
                        _.forEach(workExpList, function (item, index) {
                            experReuslt += `<div class='exper-box'><div class='exper-time'><span class='from'>${item.startDate ? item.startDate : ""}</span><b>-</b><span class='to'>${item.endDate ? item.endDate : ""}</span></div> <h3 class='corp-name'>${item.companyName ? item.companyName : ""}</h3><div class='job-posi'>${item.position ? item.position : ""}</div><div class='exper-content'><p>${item.summary ? item.summary : ""}</p></div></div>`;
                        });
                        $('.exper-box').remove();
                        $('#myexper').append(experReuslt);
                    }

                    // 项目经验
                    let proReuslt = "";
                    if (projectExpList != null) {
                        _.forEach(projectExpList, function (item, index) {
                            proReuslt += `<div class="prog-box"><div class="prog-name">${item.name ? item.name : ""}</div><div class="proj-time"><span class="from">${item.startDate ? item.startDate : ""}</span> <b>-</b> <span class="to">${item.endDate ? item.endDate : ""}</span></div> <div class="proj-content"><p>${item.description ? item.description : ""}</p></div></div>`;
                        });
                        $('.prog-box').remove();
                        $('#mypro').append(proReuslt);
                    }

                    // 教育经历
                    let eduReuslt = "";
                    if (educationExpList != null) {
                        _.forEach(educationExpList, function (item, index) {
                            eduReuslt += `<div class='edu-box'><div class='school-name'>${item.schoolName ? item.schoolName : ""}</div><div class='edu-time'><span class='from'>${item.startDate ? item.startDate : ""}</span><b>-</b><span class='to'>${item.endDate ? item.endDate : ""}</span></div><div class='edu-info'><span class='profess'>${item.majorName ? item.majorName : ""}</span></div></div>`;
                        });
                        $('.edu-box').remove();
                        $('#myedu').append(eduReuslt);
                    }

                    // 证书
                    let cerReuslt = "";
                    if (cerdata != null) {
                        cerdata.forEach(function (item, index) {
                            cerReuslt += `<div class='credits-box'><div class='credits-name'>${item.certname}</div><div class='credits-time'><span class='from'>${item.gaintime}</span><span>颁发</span></div><div class='fromplace'><label>颁发机构</label><i>：</i><span>${item.certname}</span></div></div>`;
                        });
                        $('.credits-box').remove();
                        $('#mycer').append(cerReuslt);
                    }

                    //查看联系方式点击事件
                    $('.look').click(function () {
                        const lockresume = {
                            "head": {
                                "transcode": "H0041",
                                "type": "h"
                            },
                            "data": {
                                "token": token,
                                "tokenKey": tokenKey,
                                "resumeid": resumeid
                            }
                        };
                        $.ajax({
                            type: "POST",
                            url: "/emobile/api/hr/lockresume",
                            contentType: "application/json",
                            data: JSON.stringify(lockresume),
                            dataType: "json",
                            success: function (data) {
                                if (data.returnCode == 'AAAAAAA') {
                                    $('.mobile, .email').show();
                                    $(".look").hide();
                                } else {
                                    $('.mobile, .email').hide();
                                    $(".look").show();
                                    layer.open({
                                        content: data.returnMsg,
                                        skin: 'msg',
                                        style: 'font-size: 0.16rem',
                                        className: 'popup',
                                        shade: 'background-color: rgba(0,0,0,.3)',
                                        time: 2
                                    });
                                }
                            },
                            error: function (data) {
                                $('.mobile, .email').hide();
                                $(".look").show();
                                layer.open({
                                    content: data,
                                    skin: 'msg',
                                    style: 'font-size: 0.16rem',
                                    className: 'popup',
                                    shade: 'background-color: rgba(0,0,0,.3)',
                                    time: 2
                                });
                            }
                        });
                    });
                }else{
                    $('#loadingzzz').show();
                    layer.open({
                        content: JSON.stringify(data.returnMsg),
                        skin: 'msg',
                        style: 'font-size: 0.16rem',
                        shade: 'background-color: rgba(0,0,0,.3)',
                        time: 2
                    });
                }
            },
            error: function(xhr, status, error){
                console.log(xhr, status, error)
            }
        })
    }

})