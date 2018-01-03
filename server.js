/**
 * Created by juanl on 2017/4/9.
 */
const express = require('express'),
    join = require('path').join,
    app = express();
const proxy = require('http-proxy-middleware');

app.use(express.static(join(__dirname,'src/www')));

// 设置代理
app.use('*', proxy({
    target: 'http://192.168.1.251:6688',
    changeOrigin: true
}));

app.listen(3000,()=>{
    console.log('app listening on port 3000');
})