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
    document.cookie = "CHYJRTGN_APP1=" + escape("E458BD3B260FB31485BB8BC07C9D8400741B232B2D53AF2CDC357750D3AD102C50C7B4E016D98C9E7EFD3DC5806B82F395279F5966B16340BFEF6CD725F1F332175D3ACF92A9941E7882C22EC2E02173875E0628FC03577D"); //cookieName为要写入的Cookie的名称
    //tokenKey
    document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA39A6B23F6B25ECCE22BC1C2AED9FB07EB99669FEFDA9EB83DEA97C7B906C81217253D740C37E8976E9A48D1ECD91D5C5"); //cookieName为要写入的Cookie的名称

    /**
     获取企业版传过来的token 和tokenkey
     */
    token = bundle.getCookie("CHYJRTGN_APP1");
    tokenKey = bundle.getCookie("CacheKey_APP1");
    // 获取resumeId
    let resumeid = location.search.replace("?", "").split("=")[1];

    const json = {
        "head": {
            "transcode": "H0016",
            "type": "h"
        },
        "data": {
            "token": token,
            "tokenKey": tokenKey,
            "resumeid": resumeid
        }
    };

    PR = "http://" + window.location.host;
    // PR = "http://192.168.1.251:6688/";

    // 隐藏手机，邮箱
    $('.mobile, .email').hide();

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/pinfodetail",
        data: JSON.stringify(json),
        dataType: "json",
        success: function (data) {
            if (data.returnCode == "AAAAAAA") {
                $('#loadingzzz').hide();
                const {
                    userid, //用户编号	
                    username, //用户名称	
                    salary, //薪资·要求
                    livecityid, //城市	
                    workyears, //工作年限	
                    educationbg, //学历	
                    headimg, //头像地址	
                    titlenow, //目前职位	
                    companynow, //目前公司	
                    selfRemark, //个人评价		当前接口没有该数据
                    joblb, //期望行业
                    updatedate, //更新时间		更新时间
                    phone, //手机号码		当islock为1时有数据，为0时没有数据
                    email, //邮箱		当islock为1时有数据，为0时没有数据
                    jobstatus, //工作状态		工作状态
                    islock, //是否查看该简历		0 未查看 1  以查看
                    jobNature, //全职/兼职
                    postsTime, //到岗时间
                    marital //婚姻状况
                } = data.resumebase; //简历基本信息
                // 头部
                $('.profile').css({
                    'background-image': 'url(' + headimg + ')',
                    'background-position': 'center'
                });
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
                selfRemark ? $('.evalu-box').empty().append("<p>" + selfRemark + "</p>") : $('.evalu-box').empty().append('暂无');

                const {
                    videodata, //简历视频信息
                    workdata, //工作经历
                    prodata, //项目经验
                    edudata, //教育经历
                    cerdata, //证书
                    landata, //语言能力
                    tradata, //培训能力
                    othdata, //附加信息
                    higdata //高级人才附加信息
                } = data;

                // 工作经验
                let experReuslt = "";
                if (workdata != null) {
                    _.forEach(JSON.parse(workdata), function (item, index) {
                        experReuslt += `<div class='exper-box'><div class='exper-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.starttime}</span></div> <h3 class='corp-name'>${item.corpname}</h3><div class='job-posi'>${item.postcode}</div><div class='exper-content'><p>${item.workremark}</p></div></div>`;
                    });
                    $('.exper-box').remove();
                    $('#myexper').append(experReuslt);
                }

                // 项目经验
                let proReuslt = "";
                if (prodata != "") {
                    _.forEach(JSON.parse(prodata), function (item, index) {
                        proReuslt += `<div class="prog-box"><div class="prog-name">${item.projectname}</div><div class="proj-time"><span class="from">${item.starttime}</span> <b>-</b> <span class="to">${item.endtime}</span></div> <div class="proj-content"><p>${item.projectremark}</p></div></div>`;
                    });
                    $('.prog-box').remove();
                    $('#mypro').append(proReuslt);
                }

                // 教育经历
                let eduReuslt = "";
                if (eduReuslt != null) {
                    _.forEach(JSON.parse(edudata), function (item, index) {
                        eduReuslt += `<div class='edu-box'><div class='school-name'>${item.school}</div><div class='edu-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.endtime}</span></div><div class='edu-info'><span class='profess'>${item.specialtyid}</span><b>|</b><span class='degree'>${item.educationbg}</span></div></div>`;
                    });
                    $('.edu-box').remove();
                    $('#myedu').append(eduReuslt);
                }

                // 证书
                let cerReuslt = "";
                if (cerdata != null) {
                    JSON.parse(cerdata).forEach(function (item, index) {
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
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });
});