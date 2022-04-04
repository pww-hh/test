<template>
  <div class='about'>
      <h1>{{id ? '编辑':'新建'}}英雄</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-tabs type='border-card' value="basic">
          <el-tab-pane label="基本信息" name="basic">

        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
      </el-form-item>

       <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="头像">
          <!--action:上传地址-->
          <el-upload
            class="avatar-uploader"
           :action="$http.defaults.baseURL + '/upload'"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res=>$set(model,'avatar',res.url)">
            <!--图片地址-->
            <img v-if="model.avatar" :src="model.avatar" class="avatar">
            <!--默认图标-->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-form-item>

      <el-form-item label="Banner">
          <!--action:上传地址-->
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res=>$set(model,'banner',res.url)">
            <!--图片地址-->
            <img v-if="model.banner" :src="model.banner" class="avatar">
            <!--默认图标-->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
      </el-form-item>

        <!--多选框--> 
      <el-form-item label="类型">
          <el-select  v-model="model.categories" multiple>
               <el-option v-for="item of categories" :key='item._id'
               :label="item.name" :value="item._id"></el-option>
           </el-select>
      </el-form-item>

      <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem;" 
            :max='10' show-score 
            v-model="model.scores.difficult"></el-rate>
      </el-form-item>

      <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem;" :max='10' show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem;" :max='10' show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem;" :max='10' show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>

        <el-form-item label="顺风出装">
          <el-select  v-model="model.items1" multiple>
               <el-option v-for="item of items" :key='item._id'
               :label="item.name" :value="item._id"></el-option>
           </el-select>
      </el-form-item>
      
      <el-form-item label="逆风出装">
          <el-select  v-model="model.items2" multiple>
               <el-option v-for="item of items" :key='item._id'
               :label="item.name" :value="item._id"></el-option>
           </el-select>
      </el-form-item>
      
    <el-form-item  label="使用技巧">
        <el-input type='textarea' v-model="model.usageTips"></el-input>
    </el-form-item>
    <el-form-item  label="对抗技巧">
        <el-input type='textarea' v-model="model.battleTips"></el-input>
    </el-form-item>
    <el-form-item  label="团战思路">
        <el-input type='textarea' v-model="model.teamTips"></el-input>
    </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能" name="skills">

          <el-button  size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>

          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

            <el-form-item label="图标">
                <!--action:上传地址-->
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(item,'icon',res.url)">
                    <!--图片地址-->
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <!--默认图标-->
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
              
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>

              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description"
                type="textarea"
                ></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>

              <el-form-item >
                <el-button type="danger" size="small"
                @click="model.skills.splice(i,1)"
                >删除</el-button>
              </el-form-item>
              

                </el-col>
            </el-row>
          
          </el-tab-pane>

          <el-tab-pane label="最佳搭档" name="partners">
          <el-button  size="small" @click="model.partners.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>

          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
              
              <el-form-item  label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option 
                  v-for='hero in heroes' 
                  :key='hero._id'
                  :value="hero._id"
                  :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
      
              <el-form-item label="描述">
                <el-input v-model="item.description"
                type="textarea"
                ></el-input>
              </el-form-item>

              <el-form-item >
                <el-button type="danger" size="small"
                @click="model.partners.splice(i,1)"
                >删除</el-button>
              </el-form-item>
              

                </el-col>
            </el-row>
          
          </el-tab-pane>
      </el-tabs>
      

      <el-form-item style="margin-top:1rem">
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
      data() {
    return {
      categories: [],
      items: [],
      heroes: [],
      model: {
        name: "",
        avatar: "",
        skills: [],
        partners: [],
        scores: {
          difficult: 0
        }
      }
    };
  },
    methods:{

        //请求一个接口，提交数据
        async save(){
            let res   
            if(this.id){
                //更新
                 res=await this.$http.put(`rest/heroes/${this.id}`,this.model) 
            }else{
                //添加
                 res=await this.$http.post('rest/heroes',this.model)
            }
        
           //编程式路由导航，跳转到下一个组件
           // this.$router.push('/heroes/list')
            //提示信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/heroes/${this.id}`)
            //数据整合
            this.model=Object.assign({},this.model,res.data)
        },
        //获得英雄分类
        async fetchCategories(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/categories`)
            this.categories=res.data
            
        },
        //获得物品的数据
        async fetchItems(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/items`)
            this.items=res.data
            
        },
        //获得搭档英雄的数据
        async fetchHeroes(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/heroes`)
            this.heroes=res.data
            
        },
       
    },
    //编辑的时候，如果该数据存在，则获取添加到input框
    created(){
        this.fetchItems()
        this.fetchCategories()
        this.id && this.fetch()
        this.fetchHeroes()
    }
}
</script>

<style>

</style>