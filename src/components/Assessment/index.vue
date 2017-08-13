<!-- 测评 -->
<template>
	<div class="assessment p-com-container">
		
	</div>
</template>
<script>
	export default{
		data(){
			return {
				assList:[]
			}
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.getAssList()
			},
			getAssList(){
				let vm = this
				vm.assList = vm.$store.getters.activeAssList
				if(vm.assList.length == 0){
					vm.$store.dispatch('FETCH_ASSLIST')
					.then(resp=>{
						vm.assList = vm.$store.getters.activeAssList
					})
				}
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.assessment{
		
		
	}
</style>