<!-- 我的测评 -->
<template>
	<div class="mine-ass p-container">
		<x-header :left-options="{backText: ''}" title="我的测评"></x-header>
		<tab :line-width="1" custom-bar-width="60px">
	        <tab-item selected>未完成</tab-item>
	        <tab-item>已完成</tab-item>
	    </tab>
	    <div class="p-com-wrapper" v-if="assList.length>0&&endLoad">
	    	<ass-cell v-for="item in assList" :cell="item" key="item">
	    		<span slot="btn" class="ass-btn" @click="assGo">继续测评</span>
	    	</ass-cell>
	    </div>
	    <div class="p-com-wrapper" v-if="assList.length==0&&endLoad">
	    	<error-info></error-info>
	    </div>
	    

	</div>
</template>
<script>
	import {Tab, TabItem,XHeader} from 'vux'
	import { AssCell } from './mineComponent'
	import ErrorInfo from '../AppBase/ErrorInfo'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				assList:[],
				endLoad:false
			}
		},
		components:{
			Tab, TabItem, XHeader,AssCell,ErrorInfo
		},
		methods:{
			loadInfo(){
				let vm = this
				api.getMineAss().then(resp=>{
					if(resp.data.res=='0'){
						vm.assList = resp.data.data
						vm.endLoad = true
					}
				})
			},
			assGo(){
				console.log('go')
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.mine-ass{
		.vux-tab .vux-tab-item.vux-tab-selected{
			color: $text-green-color;
			border-bottom-color: $text-green-color;
		}
		.p-com-wrapper{
			height: calc(100% - 90px);
		}
		.ass-btn{
			color: #fff;
			background-color: $text-green-color;
			padding: 0.08rem 0.133333rem;
			border-radius: 0.08rem;
		}
	}
</style>