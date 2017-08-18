<!-- 收费测评详情 -->
<template>
	<div class="ass-price-detail p-container">
		<x-header :left-options="{backText: ''}" title="测评详情" class="vux-1px-b"></x-header>
		<ass-info :info="assInfo" class="p-com-wrapper" v-if="endLoad"></ass-info>
		<div class="price-wrap">
			<span class="price vux-1px-t">23元</span>
			<span class="ass-btn">立即购买</span>
		</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import {AssInfo} from './assComponent'
	import * as api from '../../api/assessmentApi'
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
				api.getAssDetail().then(resp=>{
					if(resp.data.res == 0){
						vm.assInfo = resp.data.data
						vm.endLoad = true
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
	.ass-price-detail{
		.p-com-wrapper{
			background-color: #fff;
			height: calc(100% - 1.2rem - 46px);
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
