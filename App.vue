<script>
	import Vue from 'vue'
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['darkMode'])
		},
		onLaunch() {
			// init system
			this.initSystem()
			// auto login
			// this.autoLogin()
		},
		beforeCreate: function() {
			this.listenSystemTheme()
		},
		methods: {
			setDarkMode() {
				document.getElementsByTagName('body')[0].className = 'custom-dark'
			},
			setLightMode() {
				document.body.removeAttribute('class', 'custom-dark')
			},
			// listen system theme: dark or light
			listenSystemTheme() {
				uni.onUIStyleChange(res => {
					res.style === 'dark' ? this.setDarkMode() : this.setLightMode()
				})
				this.darkMode ? this.setDarkMode() : this.setLightMode()
			},
			// auto login
			autoLogin() {
				this.$store.dispatch('autoLogin')
			},
			// init system
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
	/* fix: toutiao mini-program font is invalid */
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
	@import 'assets/css/custom-dark.less';
	@import 'assets/css/file-icons/style.css';
	@import 'highlight.js/styles/github.css';
</style>

<style lang="less">
	@import 'assets/css/style.less';
</style>
