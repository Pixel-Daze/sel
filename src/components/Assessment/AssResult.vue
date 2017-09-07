<!-- 测评结果页 -->
<template>
	<div class="ass-result">
		<div class="ass-info vux-1px-b">
			<p class="ass-title">适应性行为测评</p>
			<p class="des">测试者：朱智鑫</p>
			<p class="des">测试时间：2017-08-28</p>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<div class="detail">曲水流觞，是中国古代民间的一种传统习俗，后来发展成为文人墨客诗酒唱酬的一种雅事。夏历的三月上巳日人们举行祓禊（fuxi)仪式之后，大家坐在河渠两旁，在上流放置酒杯，酒杯顺流而下，停在谁的面前，谁就取杯饮酒，意为除去灾祸不吉。这种传统历史非常古老，最早可以追溯到西周初年，据南朝梁吴均《续齐谐记》："昔周公卜城洛邑，因流水以泛酒，故逸《诗》云'羽觞随流波'。"</div>
		</div>
		<div class="ass-pdf activeBg" @click="getPDF">
			<span class="icon iconfont icon-pdf"></span>
			<p>点击查看完整测评报告</p>
		</div>
	</div>
</template>
<script>
	import { XHeader } from 'vux'
	export default{
		components:{
			XHeader
		},
		methods:{
			getPDF(){
				
			},
			loadInfo(){
				document.title = '测评结果'
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