//服务器端的入口文件
const express=require('express')
//实例化
const app=express()

app.set('secret','bjsklfjdsljdskla')

//引入跨域模块的中间件
app.use(require('cors')())
//引入中间件，处理请求体req.body
app.use(express.json())

app.use('/',express.static(__dirname+'/web'))
app.use('/admin',express.static(__dirname+'/admin'))
//把uploads托管为静态文件夹
app.use('/uploads',express.static(__dirname+'/uploads'))


//引入数据库
require('./plugins/db')(app)
//引入处理路由信息的接口
require('./routes/admin')(app)
//引入前端路由接口
require('./routes/web')(app)



//配置服务端口
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})