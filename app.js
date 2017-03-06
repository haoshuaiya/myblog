var express =require('express')
//加载模版处理模块
var swig =require('swig');

//加载数据库模块

var mongoose =require('mongoose');
// http.createServer
var app =express();

//设置静态文件托管
app.use('/public',express.static(__dirname+'/public'));
//定义模版引擎,第一个参数模版文件后缀，第二个参数用于解析处理模版内容处理方法
app.engine('html',swig.renderFile);
//设置模版文件存放目录
app.set('views','./views');
//注册模版引擎，第一个参数 view engine，第二个参数和定义模版引擎的名称一致
app.set('view engine','html');
//  开发过程中，取消模版缓存
swig.setDefaults({cache:false});
//路由
    app.use('/admin',require('./routes/admin'));
    // app.use('/api',require('./routes/api'));
    app.use('/',require('./routes/main'));
mongoose.connect('mongodb://localhost:27019/blog',function (err) {
    if (err){
        console.log('数据库连接失败');
        console.log(err);
    }else{
        console.log('数据库连接成功');
        //监听请求
        app.listen(9999);
    }
})
