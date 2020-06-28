<template>
</template>

<script>
	export default {
		onShow() {
			this.listAuthNotifications()
		},
		methods: {
			async listAuthNotifications() {
				const res = await this.$minApi.listAuthNotifications()
				uni.showModal({
					content: JSON.stringify(res)
				})
			}
		}
	}
</script>
