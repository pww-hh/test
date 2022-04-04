<template>
  <m-card :icon="icon" :title="title">
          <!--卡片菜单-->
          <div class='nav jc-between'>
            <div class='nav-item' :class="{active:active===i}"
            v-for="(category,i) in categories" :key='i'
            @click='$refs.list.$swiper.slideTo(i)'>

            <div class='nav-link'>{{category.name}}</div>
            </div>
          </div>

           <!--卡片内容-->
           <div class='pt-3'>
             <swiper ref='list' :options="{autoHeight:true}"
             @slide-change="()=>active=$refs.list.$swiper.realIndex">
                <!--一个swiper-slide代表导航菜单的一个项目-->
                <swiper-slide  v-for="(category,i) in categories" :key='i'>
                    <slot name='items' :category="category"></slot>
                </swiper-slide>
           </swiper>
           
           </div>
     
      </m-card>
</template>

<script>
export default {
   props:{
    icon:{type:String,required:true},
    title:{type:String,required:true},
    categories:{type:Array,required:true}
   },
   data(){
       return {
           active:0,
       }
   }
}
</script>

<style>

</style>