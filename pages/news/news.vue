<template>
</template>

<script>
	export default {
		onLoad() {
			this.listAuthNotifications()
		},
		methods: {
			async listAuthNotifications() {
				const res = await this.$minApi.listAuthNotifications()
				console.log(res)
			}
		}
	}
</script>
