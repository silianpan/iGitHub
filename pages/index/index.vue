<template>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<u-action-sheet :list="listItems" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	import { getQueryString } from '@/utils/href'
	import { githubClientId, githubClientSecret } from '@/config'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				listItems: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true
			}
		},
		onLoad(option) {
			const code = getQueryString('code')
			if (code) {
				this.$minApi.login(code).then(res => {
					console.log('res', res)
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
