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
	import * as api from '../../api/assessmentApi'
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
				vm.getUserInfo()
			},
			getUserInfo(){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				if(vm.getMsg('base','userInfo')!=null){
					vm.getCourseList(vm.getMsg('base','userInfo').role)
				}else{
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
							vm.getCourseList(vm.getMsg('base','userInfo').role)
						}else{
							vm.getCourseList(0)
						}
					})
				}
			},
			getCourseList(access){
				let vm = this,body = {
					user_access:access
				}
				vm.courseList = vm.$store.getters.activeCourseList
				if(vm.courseList.length == 0){
					vm.$store.dispatch('FETCH_COURSE_LIST',body)
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
		background-color: #fff;
	}
</style>