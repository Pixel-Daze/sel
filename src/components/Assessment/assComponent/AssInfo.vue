<!-- 测评信息 -->
<template>
	<div class="ass-info">
		<div class="img-wrap vux-1px-b">
			<img :src="info.picture" alt="">
		</div>
		<div class="ass-attr vux-1px-b">
			<p class="title">{{info.name}}</p>
			<div class="attrs text-gray">
				<span>{{info.question_count}}道精选问题</span>
				<span>{{info.page_number}}页专业报告</span>
				<span>{{info.person_count}}人测试过</span>
			</div>
		</div>
		<div class="ass-attr vux-1px-b">
			<p class="title">{{info.name}}</p>
			<div class="attrs text-gray">
				<span>{{info.question_count}}道精选问题</span>
				<span>{{info.page_number}}页专业报告</span>
				<span>{{info.person_count}}人测试过</span>
			</div>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<div class="detail">{{info.details}}</div>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<div class="detail">{{info.details}}</div>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<p class="title">
				<span class="icon iconfont icon-flag"></span>为什么测试
			</p>
			<div class="detail">{{info.details}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			info:Object
		}
	}
</script>
<style lang='scss'>
	.ass-info{
		.img-wrap{
			height: 4rem;
			padding-top: 0.3rem;
			text-align: center;
			img{
				height: 3.4rem;
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
	}
</style>