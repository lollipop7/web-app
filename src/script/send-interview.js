/**
 * Created by lollipop on 2018/1/4
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle",
        "lodash": "lodash.min",
        "layer": "layer"
    },
    shim: {
        "moment": {
            exports: "moment"
        }
    }
});



require(['jquery', 'bundle', 'moment', 'lodash', 'layer'], function ($, bundle, moment, lodash, layer){
    // some code here
    //token
    // document.cookie = "CHYJRTGN_APP1=" + escape("C3956733D321FCF621FAE43E7213B809C43D05C4916A1AD06D608727832C26C20123816B03008EA28C39851E67C37C03B9D7D778D0011B190C0FE6AC6EFF4BF0063D5E292F54A163F323070078C5580FD8544BDD4B51D09E");//cookieName为要写入的Cookie的名称
    //tokenKey
    // document.cookie = "CacheKey_APP1=" + escape("61502EADEDFE49FA2A09CB9B0F3B519E94B447FE284697B233C2323A3C1AAD3603BC0532369A0E674C411F64F98CE3F74E1DD9252A901A27");//cookieName为要写入的Cookie的名称

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
            "token":token,
            "tokenKey":tokenKey,
            "jobid": jobid,
            "PhxID": PhxID
        }
    }


    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/sendInterview",
        contentType: "application/json",
        data: JSON.stringify(sendInterviewJson),
        dataType: "json",
        error: function(xhr,status,error){
            console.log(xhr,status,error)
        },
        success: function (data) {
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
                    `
                })
                $('#benifit').empty().append(wealRlt);

                //工资
                salary ? $('#salary').text(salary) :  $('#salary').text('面议');

                //公司logo
                headimg ? (
                    $('#corp_logo').show().attr('src',headimg),
                    $('.corp-info .logo .mask').hide()
                    )
                    : $('#corp_logo').hide();

                //公司名称
                corpname ? $('#cor_name').text(corpname) : $('#cor_name').text('不详');

                //公司行业
                industry ? $('#industry').text(industry).prepend('<b>|</b>') : $('#industry').text('不详');

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
        }
    });

    function saveIterview(){
        //职位编号
        // const jobid = $("#jobid").val();
        //应聘者环信id
        // const PhxID = $("#PhxID").val();
        //职位名称
        const jobname = $("#jobname").text();
        //面试时间
        const interviewtime = $("#interviewTime").val();
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
                "token":token,
                "tokenKey":tokenKey,
                "jobid":jobid,
                "PhxID": PhxID,
                "jobname": jobname,
                "interviewtime": interviewtime.replace("T"," "),
                "cphone": cphone,
                "address": address,
                "remarks": remarks
            }
        }

        const PR = "http://"+window.location.host+"/";
        $.ajax({
            type:"POST",
            url:PR+"emobile/api/hr/saveInterview",
            contentType:"application/json",
            data: JSON.stringify(saveInterviewJson),
            dataType: "json",
            success:function(data){
                console.log(data)
                if(data.returnCode == "AAAAAAA"){
                    layer.open({
                        content: '发送成功',
                        skin: 'msg',
                        style: 'font-size: 0.16rem',
                        shade: 'background-color: rgba(0,0,0,.3)',
                        time: 2
                    });
                    var str = "{\"data\":{\"corpname\":\""+data.data.corpname+"\",\"address\":\""+data.data.address+"\",\"interviewtime\":\""+data.data.interviewtime+"\",\"inteid\":\""+data.data.inteid+"\"}}";
                    window.location.href+="&"+str;
                }else {
                    layer.open({
                        content: JSON.stringify(data.returnMsg),
                        skin: 'msg',
                        style: 'font-size: 0.16rem',
                        shade: 'background-color: rgba(0,0,0,.3)',
                        time: 2
                    });
                }
            },
            error: function(xhr,status,error){
                console.log(xhr,status,error)
            }
        })
    }

    //字数限制
    $('.oText').bind('input propertychange', function() {
        var len = $(this).val().length;
        if( len < 100 ){
            $('.oSpan em').html(len);
        }else{
            var limit = $(this).val().substring(0,100);
            $('.oText').val(limit);
            $('.oSpan em').html('100');
        }
    });

    //点击按钮
    $('.saveIterview').click(function () {
        saveIterview()
    });

});