<template>
  <div class='about'>
      <h1>{{id ? '编辑':'新建'}}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
       
      <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="密码">
          <el-input  v-model="model.password"></el-input>
      </el-form-item>

      <el-form-item>
           <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    //获取到list组件跳转时携带的参数
    props:{
        id:{}
    },
    data(){
        return{
            model:{},
         
        }
    },
    methods:{
        //请求一个接口，提交数据
        async save(){
            let res   
            if(this.id){
                //更新
                 res=await this.$http.put(`rest/admin_users/${this.id}`,this.model) 
            }else{
                //添加
                 res=await this.$http.post('rest/admin_users',this.model)
            }
        
           //编程式路由导航，跳转到下一个组件
            this.$router.push('/admin_users/list')
            //提示信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/admin_users/${this.id}`)
            this.model=res.data
        },
       
    },
    
    created(){
       
        this.id && this.fetch()
    }
}
</script>

<style>

</style>