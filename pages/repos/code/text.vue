<!-- 文本预览 -->
<template>
	<!-- #ifdef H5 -->
	<view v-if="reposContent" v-highlight>
		<pre><code v-html="reposContent"></code></pre>
	</view>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view v-if="owner && repo && path">
		<web-view :src="`/hybrid/html/index.html?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}&path=${encodeURIComponent(path)}`"></web-view>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
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
