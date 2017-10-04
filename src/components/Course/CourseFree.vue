<template>
	<div class="course-free  p-container">
		<div v-if="!showFlag" class="video-pic">
			<img :src="cover" alt="">
		</div>
		<div v-show="showFlag" class="prism-player" id="J_prismPlayer" style="position: absolute" ></div>
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
	    <div class="ass-btn" @click="openStudy">开始学习</div>
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
				player:{},
				showFlag:false,
				cover:''
			}
		},
		components:{
			XHeader,Tab, TabItem, Swiper, SwiperItem
		},
		methods:{
			loadInfo(){
				let vm = this
				vm.courseInfo = vm.getMsg('courseDetail','info')
				document.title = vm.courseInfo.name
				let body = {
					media:vm.courseInfo.media
				}
				api.getVideoPlayAuth(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.cover = resp.data.data.coverurl
						vm.getMedia(vm.courseInfo.media,resp.data.data)
					}
				})
			},
			getMedia(media,data){
				let vm = this
				vm.player = new prismplayer({
		            id: 'J_prismPlayer',
		            width: '100%',
		            height: '230px',
		            autoplay: false,
		            //播放方式二：推荐
		            vid : media,
		            playauth : data.playAuth,
		            cover: data.coverurl
		        });
			},
			openStudy(){
				let vm = this
				if(vm.getMsg('base','userInfo')!=null){
					let body = {
						course_id:vm.courseInfo.course_id,
						user_id:vm.getMsg('base','userInfo').user_id
					}
					/* 发送观看记录 */
					api.videoPlaybackRecord(body)
					vm.showFlag = true
					vm.player.play()
				}else{
					vm.$vux.confirm.show({
						// 组件除show外的属性
						title: '提示',
        				content: '前往登录',
						onCancel () {
								    	
						},
						onConfirm () {
							vm.$router.push({name:'Login'})
						}
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
	.course-free{
		.prism-player{
			position: relative !important;
		}
		.video-pic{
			height: 230px;
			width: 100%;
			img{
				width: 100%;
				height: 100%;
				display: inline-block;
			}
		}
		.info-swiper{
			height: calc(100% - 230px - 1.2rem) !important;
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