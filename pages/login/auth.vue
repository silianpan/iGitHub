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
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			setTimeout(() => {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
				wv.overrideUrlLoading({mode: 'reject'}, event => {
					const code = getQueryString4Url(event.url, 'code')
					this.$store.commit('loginSuccess', code)
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			}, 1000) //如果是页面初始化调用时，需要延时一下
			// #endif
		}
	}
</script>
