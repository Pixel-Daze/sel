<!-- 课程 -->
<template>
	<div class="course p-com-container">
		<ass-cell-wrapper v-for="item in courseList" :ass="item" :key="item.category">
			<ass-cell v-for="cell in item.data" :cell="cell" :key="cell.evaluation_id"></ass-cell>
		</ass-cell-wrapper>
	</div>
</template>
<script>
	import { AssCell,AssCellWrapper } from '../Assessment/assComponent'
	export default{
		data(){
			return {
				courseList:[]
			}
		},
		components:{
			AssCell,
			AssCellWrapper
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.getCourseList()
			},
			getCourseList(){
				let vm = this
				vm.courseList = vm.$store.getters.activeCourseList
				if(vm.courseList.length == 0){
					vm.$store.dispatch('FETCH_COURSE_LIST')
					.then(resp=>{
						vm.courseList = vm.$store.getters.activeCourseList
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
	.course{
		
	}
</style>