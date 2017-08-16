<!-- app-base -->
<template>
	<div class="app-base p-container">
		<router-view class="router-view"></router-view>	
		<tabbar v-model="selected">
      <tabbar-item class="activeBg" @click.native="changeTab(0)">
        <span slot="icon" class="icon iconfont icon-ceping"></span>
        <span slot="label">测评</span>
      </tabbar-item>
      <tabbar-item class="activeBg" @click.native="changeTab(1)">
        <span slot="icon" class="icon iconfont icon-kecheng"></span>
        <span slot="label">课程</span>
      </tabbar-item>
      <tabbar-item class="activeBg" @click.native="changeTab(2)">
        <span slot="icon" class="icon iconfont icon-wode"></span>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
	</div>
</template>
<script>
	import { Tabbar, TabbarItem } from 'vux'
	export default {
    data(){
      return {
        selected:0
      }
    },
		components: {
      Tabbar,
      TabbarItem
    },
    methods:{
      loadInfo(){
        let vm = this
        //获取sessionStorage中的index,选择路由
        if(vm.getMsg('Index','path')){
          vm.selected = parseInt(vm.getMsg('Index','path'))
        }
      },
      changeTab(value){
          let index = parseInt(value),path=['Assessment','Course','Mine'],vm = this
          //保存已选择index
          vm.setMsg('Index','path',value)
          //判断路由是否需要跳转
          if(vm.selected != index){
              vm.$router.push({name:path[index]})
          }
      }
    },
    created(){
      this.loadInfo()
    }
	}
</script>
<style lang='scss'>
  @import '../../../static/lib/css/widget/tabbar/tabbar.scss';
  .app-base{
      .router-view {
        width: 100%;
      }
  }
</style>