<!-- 测评 -->
<template>
	<div class="assessment p-com-container">
		<ass-cell-wrapper v-for="item in assList" :ass="item" :key="item.category">
			<ass-cell v-for="cell in item.data" :cell="cell" :key="cell.evaluation_id" @click.native="goDetail(cell)"></ass-cell>
		</ass-cell-wrapper>
	</div>
</template>
<script>
	import { AssCell,AssCellWrapper } from './assComponent'
	export default{
		data(){
			return {
				assList:[]
			}
		},
		components:{
			AssCell,
			AssCellWrapper
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
			},
			goDetail(cell){
				if(cell.price>0){
					this.$router.push({path:'/assPriceDetail'})
				}else if(cell.price==0){
					this.$router.push({path:'/assFreeDetail'})
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
		background-color: #fff;
		
	}
</style>