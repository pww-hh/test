import axios from 'axios'
import Vue from 'vue'
import router from './router'
//创建axios的实例
const http=axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
    //baseURL:"http://localhost:3000/admin/api"
})

//请求头的拦截器
http.interceptors.request.use(function (config) {
    //在请求头添加token
    if(localStorage.token){
        config.headers.Authorization='Bearer '+ localStorage.token
    }
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//响应拦截
//当服务端返回错误信息，把错误信息弹出
http.interceptors.response.use(res=>{
    return res
},err=>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        //如果错误状态码为401，则跳转到登录页面
        if(err.response.status==401){
            router.push('/login')
        }

        return Promise.reject(err)
    }
    
})
export default http