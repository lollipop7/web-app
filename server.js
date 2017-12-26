/**
 * Created by juanl on 2017/4/9.
 */
const express = require('express'),
    join = require('path').join,
    app = express();
app.use(express.static(join(__dirname,'src/www')));
app.listen(3000,()=>{
    console.log('app listening on port 3000');
})