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
        "axios": "axios.min"
    }
});
require(['jquery', 'lodash', 'axios'], function ($, _, axios){
    // some code here

    console.log(axios)
});