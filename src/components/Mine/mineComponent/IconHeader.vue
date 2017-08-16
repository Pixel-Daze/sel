<template>
	<div class="mine-header">
		<div class="mine-pic">
			<span class="icon iconfont icon-head_default absCenter"></span>
		</div>
		<p class="tip">请登录</p>
	</div>
</template>
<script>
	export default{
		name:'icon-header'
	}
</script>
<style lang='scss'>
	.mine-header{
		height: 5.0rem;
		background:#01b38a;
		text-align: center;
		.mine-pic{
			width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			background: #dae2e2;
			display: inline-block;
			margin-top: 1.5rem;
			position: relative;
			.icon-head_default{
				color: #fff;
				font-size: 1.1rem;
			}
		}
		.tip{
			color: #fff;
			font-size: 0.373333rem;
			margin-top: 0.2rem;
			font-weight: bold;
		}
	}
</style>