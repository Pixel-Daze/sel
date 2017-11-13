<!-- 儿童详情-儿童测评结果 -->
<template>
	<div class="baby-ass">
		测评
	</div>
</template>
<script>
	export default {
		name:'baby-ass',
		methods:{
			loadInfo(){
				document.title = '宝贝信息'
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.baby-ass{}
</style>