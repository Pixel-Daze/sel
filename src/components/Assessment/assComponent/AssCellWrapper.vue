<template>
	<div class="ass-wrapper">
		<div class="title vux-1px-b">{{ass.category}}</div>
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'AssCellWrapper',
		props:{
			ass:Object
		}
	}
</script>
<style lang='scss'>
	.ass-wrapper{
		.title{
			height: 1.066667rem;
			font-size: 0.4rem;
			line-height: 1.066667rem;
			padding-left: 0.4rem;
		}
	}
</style>