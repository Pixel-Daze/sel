<!-- 我的课程 -->
<template>
	<div class="mine-course p-container">
		<x-header :left-options="{backText: ''}" title="我的课程" class="vux-1px-b"></x-header>
		<div class="p-com-wrapper" v-if="courseList.length>0&&endLoad">
	    	<course-cell v-for="item in courseList" :cell="item" key="item" @click="courseGo">
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
				let vm = this
				api.getMineCourse().then(resp=>{
					if(resp.data.res=='0'){
						vm.courseList = resp.data.data
						vm.endLoad = true
					}
				})
			},
			courseGo(){
				console.log('go')
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	
</style>