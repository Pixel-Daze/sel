<!-- 收费测评详情 -->
<template>
	<div class="ass-price-detail p-container">
		<ass-info :info="assInfo" class="p-com-wrapper" v-if="endLoad"></ass-info>
		<div class="ass-btn" @click="OpenTest">下一步</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import {AssInfo} from './assComponent'
	import * as api from '../../api/assessmentApi'
	import * as mineApi from '../../api/mineApi'
	import * as courseApi from '../../api/courseApi'
	export default {
		name:'assPriceDetail',
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
				let vm = this,body = {evaluation_id:vm.$route.query.evaluation_id}
				api.getAssById(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.assInfo = resp.data.data
						document.title = vm.assInfo.name
					}
					vm.endLoad = true
				})
			},
			OpenTest(){
				let vm = this,body = ''
				if(vm.getMsg('base','userInfo')!=null){
					body = {
						user_id:vm.getMsg('base','userInfo').user_id
					}
					mineApi.qrychild(body).then(resp=>{
						if(resp.data.res == 0){
							if(resp.data.data!=null){
								let body = {
									evaluation_id:vm.assInfo.evaluation_id,
									assName:vm.assInfo.name,
									keyname:vm.assInfo.key_name,
									price:vm.assInfo.price
								}
								vm.$router.push({path:'assChild',query:body})
							}else{
								vm.$vux.confirm.show({
								  	// 组件除show外的属性
								  	title: '提示',
        							content: '您还未绑定儿童信息，是否前往绑定',
								  	onCancel () {
								    	
								  	},
								  	onConfirm () {
								  		vm.$router.push({path:'/mineBaby'})
								  	}
								})
							}
						}
					})
				}else{
					vm.$vux.confirm.show({
						// 组件除show外的属性
						title: '提示',
        				content: '前往登录',
						onCancel () {
								    	
						},
						onConfirm () {
							vm.$router.push({name:'Login'})
						}
					})
				}	
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-price-detail{
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
