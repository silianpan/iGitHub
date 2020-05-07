<template>
	<view>
		<web-view :webviewStyles="webviewStyles" :src="authUrl"></web-view>
	</view>
</template>

<script>
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
			setTimeout(function() {
				wv = currentWebview.children()[0]
				wv.setStyle({
					scalable: true
				})
			}, 1000) //如果是页面初始化调用时，需要延时一下
			// #endif
		}
	}
</script>
