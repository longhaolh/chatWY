<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function (res) {
					store.commit('updateSystemInfo', res)
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/static/iconfont.css";
@import "@/uni_modules/uview-ui/index.scss";
@import "@/static/common.css";
</style>
