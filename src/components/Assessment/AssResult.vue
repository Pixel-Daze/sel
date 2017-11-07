<!-- 测评结果页 -->
<template>
	<div class="ass-result">
		<loading v-model="isLoading" text="正在生成报告"></loading>
		<res-info :username=username :resInfo=resInfo></res-info>
	</div>
</template>
<script>
	import * as api from '../../api/assessmentApi'
	import { Loading } from 'vux'
	import {ResInfo} from './assComponent'
	export default{
		data(){
			return {
				resInfo:{},
				username:'',// 用户姓名
				isLoading:true
			}
		},
		components:{
			Loading,ResInfo
		},
		methods:{
			getPDF(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id,
					typeid:vm.$route.query.typeid //生成：0 查看：1
				}
				api.qryReport(body).then(resp=>{
					if(resp.data.res==0){
						if(resp.data.data.reporttime=='00010101000000'){
							body.typeid = '1',
							vm.pluginGet(body)
						}else{
							vm.resInfo = resp.data.data
							vm.username = decodeURI(vm.getCookie('nickname'))
							vm.isLoading = false
						}
					}
				})
			},
			pluginGet(body){
				let vm = this
				api.qryReport(body).then(resp=>{
					if(resp.data.res==0){
						vm.resInfo = resp.data.data
						vm.username = decodeURI(vm.getCookie('nickname'))
						vm.isLoading = false
					}
				})
			},
			loadInfo(){
				document.title = '测评结果'
				this.getPDF()
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-result{
		height: 100%;
		background-color: #fff;
		.weui-toast{
			width: 10em;
		}
	}
</style>