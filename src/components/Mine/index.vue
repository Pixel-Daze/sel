<!-- 我的 -->
<template>
	<div class="mine p-com-container">
		<icon-header :info="info"></icon-header>
		<tabbar class="vux-1px-b">
	      <tabbar-item class="activeBg" @click.native="goTab(0)">
	        <span slot="icon" class="icon iconfont icon-ceping"></span>
	        <span slot="label">我的测评</span>
	      </tabbar-item>
	      <tabbar-item class="activeBg" @click.native="goTab(1)">
	        <span slot="icon" class="icon iconfont icon-kecheng"></span>
	        <span slot="label">我的课程</span>
	      </tabbar-item>
	      <tabbar-item class="activeBg" @click.native="goBaby">
	        <span slot="icon" class="icon iconfont icon-baobeishuo"></span>
	        <span slot="label">我的宝贝</span>
	      </tabbar-item>
	    </tabbar>
	</div>
</template>
<script>
	import { Tabbar, TabbarItem } from 'vux'
	import { IconHeader } from './mineComponent'
	import * as api from '../../api/assessmentApi'
	export default{
		data(){
			return {
				info:{}
			}
		},
		methods:{
			loadInfo(){
				this.getUserInfo()
			},
			getUserInfo(){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				let info = {
					name:decodeURI(vm.getCookie('nickname')),
					head_portrait:vm.getCookie('headimgurl')
				}
				if(vm.getMsg('base','userInfo')!=null){
					vm.info = info
				}else{
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
							vm.info = info
						}else{
							this.$router.push({name:'Login'})
						}
					})
				}
			},
			goBaby(){
				this.$router.push({path:'/mineBaby'})
			},
			goTab(){

			}
		},
		components: {
	      	Tabbar,
	      	TabbarItem,
	      	IconHeader
	    },
	    created(){
	    	this.loadInfo()
	    }
	}
</script>
<style lang='scss'>
	.mine{
		.weui-tabbar{
			position: relative;
			.weui-tabbar__item{
				padding-top: 0.2rem;
				padding-bottom: 0.2rem !important;
				.iconfont {
					font-size: 27px !important;
				}
				.icon-ceping{
					color: #20e4a0;
				}
				.icon-kecheng{
					color: #229cee;
				}
				.icon-baobeishuo{
					color: #feb000;
				}
			}
			.weui-bar__item_on{
				.weui-tabbar__label{
					color: #575656 !important;
				}
			}
			.weui-tabbar__label{
				padding-top: 0.1rem;
			}
		}
	}
</style>