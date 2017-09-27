<template>
	<div class="course-price  p-container">
		<div v-if="!showFlag" class="video-pic">
			<img :src="cover" alt="">
		</div>
		<div v-show="showFlag" class="prism-player" id="J_prismPlayer" style="position: absolute"></div>
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
	    <div class="price-wrap">
			<span class="price vux-1px-t">{{courseInfo.price}}元</span>
			<span class="ass-btn" @click="buy_course">立即购买</span>
		</div>
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
			buy_course(){
			    let vm = this,body = {
			    	name:vm.courseInfo.name,
			    	course_id:vm.courseInfo.course_id,
			    	price:vm.courseInfo.price,
			    	openid:vm.getCookie('openid'),
			    	user_id:vm.getMsg('base','userInfo').user_id
			    }
			    api.coursePay(body).then(resp=>{
			    	if(resp.data.res=='0'){
			    		vm.openPay(resp.data.data)
			    	}
			    })
				// vm.$vux.alert.show({
				// 	title: '提示',
				// 	content: '付费课程暂未开放，敬请期待'
				// })

			},
			openPay(data){
				wx.chooseWXPay({
				    timestamp: parseInt(data.TimeStamp), 
				    nonceStr: data.Nonce_str, // 支付签名随机串，不长于 32 位
				    package: 'prepay_id='+data.Prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				    paySign: data.Sign, // 支付签名
				    success: function (res) {
				        // 支付成功后的回调函数
				    }
				});
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.course-price{
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
		.price-wrap{
			position: absolute;
			bottom: 0;
			background-color: #fff;
			height: 1.2rem;
			width: 10rem;
			display: flex;
			.price{
				flex: 1;
				line-height: 1.2rem;
				font-size: 0.426667rem;
				color: #f9532d;
				padding-left: 0.4rem;
			}
			.ass-btn{
				color: #fff;
				background-color: #f9532d;
				width: 3rem;
				line-height: 1.2rem;
				text-align: center;
				font-size: 0.426667rem;
				&:active{
					background-color: rgba(249,83,45,.8);
				}
			}
		}
	}
</style>