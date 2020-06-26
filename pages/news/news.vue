<template>
</template>

<script>
	export default {
		onLoad() {
			this.listAuthUserEvents()
		},
		methods: {
			async listAuthUserEvents() {
				const res = await this.$minApi.listAuthUserEvents(this.username)
				console.log(res)
			}
		}
	}
</script>
