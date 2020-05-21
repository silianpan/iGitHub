<script>
	import Vue from 'vue'
	export default {
		onLaunch() {
			// 初始化系统
			this.initSystem()
			// 自动登录
			// this.autoLogin()
		},
		methods: {
			/**
			 * 自动登录
			 */
			autoLogin() {
				this.$store.dispatch('autoLogin')
			},
			/**
			 * 初始化系统
			 */
			initSystem() {
				uni.getSystemInfo({
					success: e => {
						// app整包更新检测
						// this.appUpgrade(e.platform)

						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif

						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		

						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import 'assets/css/uni.css';
	@import 'assets/css/iconfont.css';
	@import '@/uview/index.scss';
	@import 'assets/css/custom.css';
	@import 'assets/css/custom.less';
</style>
