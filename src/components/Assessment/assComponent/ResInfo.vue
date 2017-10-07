<template>
	<div class="ass-result-info">
		<div class="ass-info vux-1px-b">
			<p class="ass-title">{{resInfo.name}}</p>
			<p class="des">测试者：{{username}}</p>
			<p class="des">测试时间：{{resInfo.reporttime|time_con}}</p>
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
	export default {
		props:{
			username:String,
			resInfo:Object
		},
		methods:{
			findPDF(){
				location.href=this.resInfo.pdf
			}
		}
	}
</script>
<style lang='scss'>
	.ass-result-info{
		
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