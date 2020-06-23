<template>
</template>

<script>
	export default {
		onLoad() {
			this.listAuthUserReceivedEvents()
		},
		methods: {
			async listAuthUserReceivedEvents() {
				const res = await this.$minApi.listAuthUserReceivedEvents(this.username)
				console.log(res)
			}
		}
	}
</script>
