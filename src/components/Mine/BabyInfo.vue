<!-- 儿童详情-儿童信息 -->
<template>
	<div class="baby-info">
		儿童信息
	</div>
</template>
<script>
	export default {
		name:'baby-info',
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
	.baby-info{}
</style>