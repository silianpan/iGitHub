<template>
	<view>
		<pre><code v-html="reposContent"></code></pre>
	</view>
</template>

<script>
	import Prism from 'prismjs'
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
				const code = await this.$minApi.getReposContent(this.owner, this.repo, this.path, {
					header: {
						'Accept': 'application/vnd.github.v3.html+json'
					}
				})
				this.reposContent = Prism.highlight(code, Prism.languages.html, 'html')
			}
		}
	}
</script>
