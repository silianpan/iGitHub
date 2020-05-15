<template>
	<view>
		<RepoTrending />
	</view>
</template>

<script>
	import Vue from 'vue'
	import { getQueryString } from '@/utils/href'
	import RepoTrending from '@/pages/repos/trending'
	export default {
		components: {
			RepoTrending
		},
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
			// #ifdef H5
			const code = getQueryString('code')
			this.$store.dispatch('authLogin', code)
			// #endif
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
