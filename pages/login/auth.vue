<template>
	<view ref="mp">
		<web-view :webviewStyles="webviewStyles" :src="authUrl"></web-view>
	</view>
</template>

<script>
	let wv
	export default {
		data() {
			return {
				authUrl: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
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
		},
		onLoad(options) {
			this.authUrl = 'https://github.com/login/oauth/authorize?client_id=13c7b1a5149de3461f90&state=app'
		}
	}
</script>
