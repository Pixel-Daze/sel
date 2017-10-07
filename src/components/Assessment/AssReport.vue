<!-- 测评结果页 -->
<template>
	<div class="ass-report">
		<res-info :username=username :resInfo=resInfo></res-info>
	</div>
</template>
<script>
	import * as api from '../../api/assessmentApi'
	import {ResInfo} from './assComponent'
	export default{
		data(){
			return {
				resInfo:{},
				username:''
			}
		},
		components:{
			ResInfo
		},
		methods:{
			getPDF(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_evaluation_id:vm.$route.query.user_evaluation_id
				}
				api.qryReports(body).then(resp=>{
					if(resp.data.res==0){
						vm.resInfo = resp.data.data
						vm.username = decodeURI(vm.getCookie('nickname'))
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
	.ass-report{
		height: 100%;
		background-color: #fff;
		.weui-toast{
			width: 10em;
		}
	}
</style>