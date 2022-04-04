//数据库
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
      useNewUrlParser: true
})

//把model文件夹的所有文件引入
require('require-all')(__dirname+'/../models')


}