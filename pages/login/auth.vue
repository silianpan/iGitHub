<template>
	<view>
		<web-view :webviewStyles="webviewStyles" :src="authUrl"></web-view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getQueryString4Url } from '@/utils/href'
	import globalConfig from '@/config'
	let wv
	export default {
		computed: {
			...mapGetters(['themeBgColor'])
		},
		data() {
			return {
				authUrl: globalConfig.githubAuthUrl,
				webviewStyles: {
					progress: {
						color: '#00FF00'
					}
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('SecureLogin')
			})
			// navBar-bg-color
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeBgColor,
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			})
			// #ifdef APP-PLUS
			uni.showLoading({
				title: this.$t('HardLoading')
			})
			// webview object
			var currentWebview = this.$mp.page.$getAppWebview()
			// timeout
			setTimeout(() => {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
				wv.addEventListener('loading', e => {
					uni.showLoading({
						title: this.$t('HardLoading')
					})
				})
				wv.addEventListener('loaded', e => {
					uni.hideLoading()
				})
				wv.addEventListener('error', e => {
					uni.hideLoading()
				})
				wv.overrideUrlLoading({mode: 'reject', match: '^igithub://oauth.*'}, event => {
					const code = getQueryString4Url(event.url, 'code')
					const state = getQueryString4Url(event.url, 'state')
					this.$store.dispatch('authLogin', { code, state })
				})
			}, 1000)
			// #endif
		}
	}
</script>
