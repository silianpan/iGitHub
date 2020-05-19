<template>
</template>

<script>
	export default {
		onLoad() {
			this.getAuthUser()
		},
		methods: {
			async getAuthUser() {
				console.log('getAuth')
				const user = await this.$minApi.getAuthUser()
				console.log('user', user)
			}
		}
	}
</script>

<style>
</style>
