<template>
	<view>
		<web-view :webviewStyles="webviewStyles" :src="authUrl"></web-view>
	</view>
</template>

<script>
	import { getQueryString4Url } from '@/utils/href'
	import globalConfig from '@/config'
	let wv
	export default {
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
			// #ifdef APP-PLUS
			uni.showLoading({
				title: '努力加载中...'
			})
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(() => {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
				wv.addEventListener('loading', e => {
					uni.showLoading({
						title: '努力加载中...'
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
			}, 1000) //如果是页面初始化调用时，需要延时一下
			// #endif
		}
	}
</script>
