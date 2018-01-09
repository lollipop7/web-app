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
        "lodash": "lodash.min"
    }
});
require(['jquery', 'lodash', 'bundle'], function ($, _, bundle) {
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
    let resumeId = location.search.replace("?", "").split("=")[1];

    const testJson = {
        "head": {
            "transcode": "H0016",
            "type": "h"
        },
        "data": {
            "token": token,
            "tokenKey": tokenKey,
            "resumeid": resumeId
        }
    };

    PR = "http://" + window.location.host;
    // PR = "http://192.168.1.251:6688/";

    // 隐藏手机，邮箱
    $('.mobile, .email').hide();

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/pinfodetail",
        data: JSON.stringify(testJson),
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.returnCode == "AAAAAAA") {
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
                $('#candiname').text(username);
                $('#candi-crop').text(companynow);
                $('#candi-posi').text(titlenow);
                $('.cur-sta span').text(jobstatus);
                $('.work-exp span').text(workyears);
                $('.location span').text(livecityid);
                $('.location span').text(livecityid);
                $('.mobile span').text(phone);
                $('.email span').text(email);
                $('.posi').text(titlenow);
                $('.industry').text(joblb);
                $('.job-type').text(jobNature);
                $('.location').text(livecityid);
                $('.salary').text(salary);
                $('.duty-time').text(postsTime);
                $('.marital-sta span').text(marital);

                // 自我评价
                $('.evalu-box').empty().append("<p>" + selfRemark + "</p>");

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
                _.forEach(JSON.parse(workdata), function (item, index) {
                    experReuslt += `<div class='exper-box'><div class='exper-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.starttime}</span></div> <h3 class='corp-name'>${item.corpname}</h3><div class='job-posi'>${item.postcode}</div><div class='exper-content'><p>${item.workremark}</p></div></div>`;
                });
                $('.exper-box').remove();
                $('#myexper').append(experReuslt);

                // 项目经验
                let proReuslt = "";
                _.forEach(JSON.parse(prodata), function (item, index) {
                    proReuslt += `<div class="prog-box"><div class="prog-name">${item.projectname}</div><div class="proj-time"><span class="from">${item.starttime}</span> <b>-</b> <span class="to">${item.endtime}</span></div> <div class="proj-content">${item.projectremark}</div></div>`;
                });
                $('.prog-box').remove();
                $('#mypro').append(proReuslt);

                // 教育经历
                let eduReuslt = "";
                _.forEach(JSON.parse(edudata), function (item, index) {
                    eduReuslt += `<div class='edu-box'><div class='school-name'>${item.school}</div><div class='edu-time'><span class='from'>${item.starttime}</span><b>-</b><span class='to'>${item.endtime}</span></div><div class='edu-info'><span class='profess'>${item.specialtyid}</span><b>|</b><span class='degree'>${item.educationbg}</span></div></div>`;
                });
                $('.edu-box').remove();
                $('#myedu').append(eduReuslt);

                // 证书
                let cerReuslt = "";
                JSON.parse(cerdata).forEach(function (item, index) {
                    cerReuslt += `<div class='credits-box'><div class='credits-name'>${item.certname}</div><div class='credits-time'><span class='from'>${item.gaintime}</span><span>颁发</span></div><div class='fromplace'><label>颁发机构</label><i>：</i><span>${item.certname}</span></div></div>`;
                });
                $('.credits-box').remove();
                $('#mycer').append(cerReuslt);
                //查看联系方式点击事件
                $('.look').click(function () {
                    const testJson2 = {
                        "head": {
                            "transcode": "H0041",
                            "type": "h"
                        },
                        "data": {
                            "token": token,
                            "tokenKey": tokenKey,
                            "resumeid": resumeId
                        }
                    };
                    $.ajax({
                        type: "POST",
                        url: "/emobile/api/hr/lockresume",
                        contentType: "application/json",
                        data: JSON.stringify(testJson2),
                        dataType: "json",
                        success: function (data) {
                            console.log(9999, data);
                            if (data.returnCode == 'AAAAAAA') {
                                $('.mobile, .email').show();
                                $(".look").hide();
                            } else {
                                $('.mobile, .email').hide();
                                $(".look").show();
                                alert('您还不能查看！');
                            }
                        },
                        error: function (data) {
                            $('.mobile, .email').hide();
                            $(".look").show();
                            alert('您还不能查看！');
                        }
                    });
                });
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        }
    });
});