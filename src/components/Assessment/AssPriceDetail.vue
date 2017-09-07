<!-- 收费测评详情 -->
<template>
	<div class="ass-price-detail p-container">
		<ass-info :info="assInfo" class="p-com-wrapper" v-if="endLoad"></ass-info>
		<div class="price-wrap">
			<span class="price vux-1px-t">23元</span>
			<span class="ass-btn" @click="OpenTest">立即购买</span>
		</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import {AssInfo} from './assComponent'
	import * as api from '../../api/assessmentApi'
	import * as mineApi from '../../api/mineApi'
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
				let vm = this
				vm.assInfo = vm.getMsg('assDetail','info')
				document.title = vm.assInfo.name
				if(vm.assInfo){
					vm.endLoad = true
				}
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
									user_id:vm.getMsg('base','userInfo').user_id,
									child_id:resp.data.data[0].child_id,
									index:0
								}
								vm.$router.push({path:'assQueDetail',query:body})
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
		.price-wrap{
			position: absolute;
			bottom: 0;
			background-color: #fff;
			height: 1.2rem;
			width: 10rem;
			display: flex;
			.price{
				flex: 1;
				line-height: 1.2rem;
				font-size: 0.426667rem;
				color: #f9532d;
				padding-left: 0.4rem;
			}
			.ass-btn{
				color: #fff;
				background-color: #f9532d;
				width: 3rem;
				line-height: 1.2rem;
				text-align: center;
				font-size: 0.426667rem;
				&:active{
					background-color: rgba(249,83,45,.8);
				}
			}
		}
		
	}
</style>
