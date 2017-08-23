<!-- 问题组件 -->
<template>
	<div class="ass-que">
		{{questions}}
	</div>
</template>
<script>
	export default {
		props:{
			ques:String
		},
		computed:{
			questions:function(){
				if(this.ques){
					console.log(this.ques)
					console.log(JSON.parse(this.ques))
					// return JSON.parse(this.ques)
				}
				
			}
		}
	}
</script>
<style lang='scss'>
	
</style>