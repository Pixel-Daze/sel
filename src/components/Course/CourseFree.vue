<template>
	<div class="course-free  p-container">
		<x-header :left-options="{backText: ''}" :title="courseInfo.name" class="vux-1px-b"></x-header>
		<div class="prism-player" id="J_prismPlayer" style="position: absolute"></div>
		<div class="info-swiper">
	       	<tab :line-width=2 active-color='#01ab41' v-model="index">
	        	<tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @click="selected = item" :key="index">{{item}}</tab-item>
	      	</tab>
	      	<swiper v-model="index" :show-dots="false">
	        	<swiper-item v-for="(item, index) in list" :key="index">
	        		<div  class="tab-swiper vux-center course-des" v-if="index == 0">
	          			{{courseInfo.details}}
	          		</div>
	          		<div class="tab-swiper vux-center" v-if="index == 1">
	          			
	          		</div>
	        	</swiper-item>
	      	</swiper>
	    </div>
	    <div class="ass-btn" @click="OpenTest">开始学习</div>
	</div>
</template>
<script>
	import { XHeader, Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import * as api from '../../api/courseApi'
	export default {
		data(){
			return {
				courseInfo:{},
				endLoad:false,
				index:0,
				selected:'介绍',
				list:['介绍','资源'],
			}
		},
		components:{
			XHeader,Tab, TabItem, Swiper, SwiperItem
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.courseInfo = vm.getMsg('courseDetail','info')
				let body = {
					media:vm.courseInfo.media
				}
				api.getVideoPlayAuth(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.getMedia(vm.courseInfo.media,resp.data.data)
					}
				})
			},
			getMedia(media,playauth){
				var player = new prismplayer({
		            id: 'J_prismPlayer',
		            width: '100%',
		            height: '230px',
		            autoplay: false,
		            //播放方式二：推荐
		            vid : media,
		            playauth : playauth,
		            cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
		        });
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.course-free{
		.prism-player{
			position: relative !important;
		}
		.info-swiper{
			height: calc(100% - 230px - 46px - 1.2rem) !important;
			.vux-slider{
				height: calc(100%  - 44px) !important;
				.vux-swiper{
					height: 100% !important;
				}
			}
			.vux-swiper .course-des{
				height: 100% !important;
				overflow-y: auto;
				background: #fff;
				padding: 0.133333rem 0.4rem;
			}
			.tab-swiper{
				font-size: 0.4rem;
				padding-top: 0.133333rem;
				.swipe-area,.swipe-description{
					padding:0 0.266667rem;
					label{
						color: #6d6d6d;
					}
				}
			}
		}
		.ass-btn{
			position: absolute;
			bottom: 0;
			color: #fff;
			background-color: #f9532d;
			height: 1.2rem;
			width: 10rem;
			line-height: 1.2rem;
			text-align: center;
			font-size: 0.426667rem;
			&:active{
				background-color: rgba(249,83,45,.8);
			}
		}
	}
</style>