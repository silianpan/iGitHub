<template>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<u-action-sheet :list="listItems" v-model="show"></u-action-sheet>
		<u-button @click="testOctokit">测试octokit</u-button>
	</view>
</template>

<script>
	import Vue from 'vue'
	import { getQueryString } from '@/utils/href'
	import OctokitRequest from '@/utils/OctokitRequest'
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
					const accessToken = res.access_token
					// todo 初始化octokit实例
					const octokitRequest = new OctokitRequest(accessToken)
					Vue.prototype.$octokit = octokitRequest
				})
			}
		},
		methods: {
			testOctokit() {
				this.$octokit.repos.listForAuthenticatedUser().then(res => {
					console.log('repos', res)
				})
			}
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
