<template>
	<div class="course-price  p-container">
		<x-header :left-options="{backText: ''}" :title="courseInfo.name" class="vux-1px-b"></x-header>
		<div class="prism-player" id="J_prismPlayer" style="position: absolute"></div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import * as api from '../../api/courseApi'
	export default {
		data(){
			return {
				courseInfo:{},
				endLoad:false
			}
		},
		components:{
			XHeader
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
		            autoplay: false,
		            //播放方式二：推荐
		            vid : media,
		            playauth : playauth,
		            cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
		        });
			}
		},
		mounted(){
			this.loadInfo(0)
		}
	}
</script>
<style lang='scss'></style>