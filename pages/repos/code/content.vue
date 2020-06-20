<template>
	<!-- #ifdef H5 -->
	<div id="codeView" v-highlight>
		<pre><code v-html="reposContent"></code></pre>
	</div>
	<!-- #endif -->
	<!-- #ifndef H5 -->
	<view>
		<web-view :src="`/hybrid/html/index.html?reposContent=${encodeURIComponent(reposContent)}`"></web-view>
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
			this.getReposContent()
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
