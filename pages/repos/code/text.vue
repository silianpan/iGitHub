<!-- text preview -->
<template>
	<!-- #ifdef H5 -->
	<view v-if="reposContent" v-highlight>
		<pre><code v-html="reposContent"></code></pre>
	</view>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view v-if="owner && repo && path && defaultBranch">
		<web-view :src="`/hybrid/html/index.html?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}&defaultBranch=${encodeURIComponent(defaultBranch)}`"></web-view>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('Code')
			})
		},
		data() {
			return {
				reposContent: ''
			}
		},
		onLoad(option) {
			this.owner = option.owner
			this.repo = option.repo
			if (option.path) {
				this.path = option.path
			}
			if (option.defaultBranch) {
				this.defaultBranch = option.defaultBranch
			}
			// #ifdef H5
			this.getReposContent()
			// #endif
		},
		methods: {
			async getReposContent() {
				this.reposContent = await this.$minApi.getReposContent(this.owner, this.repo, this.path, {
					header: {
						'Accept': 'application/vnd.github.v3.html+json'
					}
				})
			}
		}
	}
</script>
