/**
 * Created by lollipop on 2018/1/8
 */
require.config({
    paths: {
        "jquery": "jquery.min",
        "bundle": "bundle"
    }
});
require(['jquery', 'bundle'], function ($, bundle) {
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

    const jobid = bundle.getUrlParam('jobid');
    const json = {
        "head": {
            "transcode": "H0011",
            "type": "h"
        },
        "data": {
            "jobid": "860001"
        }
    };

    $.ajax({
        type: "POST",
        url: "/emobile/api/hr/job",
        contentType: "application/json",
        data: JSON.stringify(json),
        dataType: "json",
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        },
        success: function (data) {
            console.log(data);
            if (data.returnCode == "AAAAAAA") {}
        }
    });
});