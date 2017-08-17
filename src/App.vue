<template>
  <div id="app">
  	<loading v-model="isLoading" text="努力加载中"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.loading.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
html,body,#app {
	height:100%;
  background:#f2f2f2;
}
</style>
