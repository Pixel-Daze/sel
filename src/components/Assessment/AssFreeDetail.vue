<!-- 免费测评页面详情 -->
<template>
	<div class="ass-free-detail p-container">
		<ass-info :info="assInfo" class="p-com-wrapper" v-if="endLoad"></ass-info>
		<div class="ass-btn" @click="OpenTest">开始测试</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import {AssInfo} from './assComponent'
	import * as api from '../../api/assessmentApi'
	import * as mineApi from '../../api/mineApi'
	export default {
		name:'assFreeDetail',
		data(){
			return {
				assInfo:{},
				endLoad:false
			}
		},
		components:{
			XHeader,AssInfo
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.assInfo = vm.getMsg('assDetail','info')
				document.title = vm.assInfo.name
				if(vm.assInfo){
					vm.endLoad = true
				}
			},
			OpenTest(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				mineApi.qrychild(body).then(resp=>{
					if(resp.data.res == 0){
						if(resp.data.data.length>0){
							let body = {
								evaluation_id:vm.assInfo.evaluation_id,
								user_id:vm.getMsg('base','userInfo').user_id,
								child_id:resp.data.data[0].child_id,
								index:0
							}
							vm.$router.push({path:'assQueDetail',query:body})
						}else{
							vm.$vux.confirm.show({
							  	// 组件除show外的属性
							  	onCancel () {
							    	
							  	},
							  	onConfirm () {
							  		vm.$router.push({name:'Login'})
							  	}
							})
						}
					}
				})
				
				
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-free-detail{
		.p-com-wrapper{
			background-color: #fff;
			height: calc(100% - 1.2rem);
		}
		.ass-btn{
			position: absolute;
			bottom: 0;
			color: #fff;
			background-color: #f9532d;
			height: 1.2rem;
			width: 10rem;
			line-height: 1.2rem;
			text-align: center;
			font-size: 0.426667rem;
			&:active{
				background-color: rgba(249,83,45,.8);
			}
		}
	}
</style>