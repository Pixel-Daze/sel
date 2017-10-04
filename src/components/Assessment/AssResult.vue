<!-- 测评结果页 -->
<template>
	<div class="ass-result">
		<loading v-model="isLoading" text="正在生成报告"></loading>
		<div class="ass-info vux-1px-b">
			<p class="ass-title">{{resInfo.name}}</p>
			<p class="des">测试者：{{username}}</p>
			<p class="des">测试时间：{{resInfo.time|time_con}}</p>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>测评结果
			</p>
			<div class="detail" v-html="resInfo.textResult"></div>
		</div>
		<div class="ass-pdf activeBg" @click="findPDF">
			<span class="icon iconfont icon-pdf"></span>
			<p>点击查看完整测评报告</p>
		</div>
	</div>
</template>
<script>
	import * as api from '../../api/assessmentApi'
	import { Loading } from 'vux'
	export default{
		data(){
			return {
				resInfo:{},
				username:'',
				isLoading:true	
			}
		},
		components:{
			Loading
		},
		methods:{
			findPDF(){
				location.href=this.resInfo.pdf
			},
			getPDF(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id
				}
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
		.ass-info{
			text-align: center;
			padding: 0.2rem 0.266667rem;
			.ass-title{
				font-size: 0.426667rem;
				font-weight: bold;
				padding-bottom: 0.4rem;
			}
		}
		
		.ass-attr{
			padding: 0.133333rem 0.266667rem 0.4rem;
			.title{
				text-align: center;
				font-weight: bold;
				font-size: 0.373333rem;
				.icon-flag{
					font-weight: normal;
					position: relative;
					bottom: -0.036rem;
					&:before{
						font-size:0.5rem;
					}
				}
			}
			.attrs{
				display: flex;
				justify-content: space-between;
				padding-top: 0.2rem;
				font-size: 0.346667rem;
			}
			.detail{
				padding-top: 0.2rem;
				font-size: 0.346667rem;
			}
		}
		.ass-pdf{
			text-align: center;
			padding: 0.266667rem 0;
			width: 5rem;
			margin:0 auto;
			.icon-pdf{
				font-size: 1.6rem;
				color: #ff5562;
			}
			p{
				font-size: 0.4rem;
				padding-top: 0.266667rem;
				color: #565656;
			}
		}
	}
</style>