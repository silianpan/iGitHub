<template>
	<view class="order" v-html="reposContent"></view>
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
