module.exports = {
    lintOnSave:false, //关闭语法检查
    //编译输出的文件地址
    outputDir:__dirname+'/../server/admin',
    //生成的静态文件路径
    publicPath: process.env.NODE_ENV === 'production'
      ? '/admin/'
      : '/'
  }