<template>
   <!--卡片布局-->
      <div class='card p-3 bg-white mt-2 '>
        <!--卡片头部-->
        <div class='card-header d-flex ai-center '
              :class="{'border-bottom':!plain,'pb-3':!plain}">
          <i class='iconfont' :class="`icon-${icon}`"></i>
          <div class='fs-xl flex-1 px-2'>
            <strong>{{title}}</strong></div>
          <i class='iconfont icon-menu' v-if='!plain'></i>
        </div>
         
        <div class='card-body pt-3'>
          <slot></slot>
        </div>
      </div>
</template>

<script>
export default {
    //接收通信数据
    props:{
        title:{
            type:String,require:true
        },
        icon:{
            type:String,require:true
        },
        plain:{type:Boolean}
    },
    data(){
        return {

        }
    }
}
</script>

<style lang='scss'>
@import '../assets/scss/_variables.scss';
  .card{
    
     border-bottom: 1px solid $boder-color;
  }
</style>