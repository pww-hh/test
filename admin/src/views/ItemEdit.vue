<template>
  <div class='about'>
      <h1>{{id ? '编辑':'新建'}}物品</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      
      
      <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
          <!--action:上传地址-->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload">
            <!--图片地址-->
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <!--默认图标-->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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

        //图片上传成功后：
        afterUpload(res){
            //给model对象添加icon属性
            this.$set(this.model,'icon',res.url)
    
        },

        //请求一个接口，提交数据
        async save(){
            let res   
            if(this.id){
                //更新
                 res=await this.$http.put(`rest/items/${this.id}`,this.model) 
            }else{
                //添加
                 res=await this.$http.post('rest/items',this.model)
            }
        
           //编程式路由导航，跳转到下一个组件
            this.$router.push('/items/list')
            //提示信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/items/${this.id}`)
            this.model=res.data
        },
       
    },
    //编辑的时候，如果该数据存在，则获取添加到input框
    created(){

        this.id && this.fetch()
    }
}
</script>

<style>

</style>