<!-- 我的课程 -->
<template>
	<div class="mine-course p-container">
		<x-header :left-options="{backText: ''}" title="我的课程" class="vux-1px-b"></x-header>
		<div class="p-com-wrapper" v-if="courseList.length>0&&endLoad">
	    	<course-cell v-for="item in courseList" :cell="item" key="item" @click="courseGo(item)">
	    		<span slot="btn" class="ass-btn" >免费</span>
	    	</course-cell>
	    </div>
	    <div class="p-com-wrapper" v-if="courseList.length==0&&endLoad">
	    	<error-info></error-info>
	    </div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import ErrorInfo from '../AppBase/ErrorInfo'
	import { CourseCell } from './mineComponent'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				courseList:[],
				endLoad:false
			}
		},
		components:{
			XHeader,ErrorInfo,CourseCell
		},
		methods:{
			loadInfo(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				api.getMineCourse(body).then(resp=>{
					if(resp.data.res=='0'&&resp.data.data!=null){
						vm.courseList = resp.data.data
					}
					vm.endLoad = true
				})
			},
			courseGo(cell){
				this.setMsg('courseDetail','info',cell)
				if(parseInt(cell.price)>0){
					this.$router.push({path:'/coursePrice'})
				}else if(cell.price==0){
					this.$router.push({path:'/courseFree'})
				}
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	
</style>