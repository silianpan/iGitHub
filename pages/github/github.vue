<template>
</template>

<script>
	export default {
		mounted() {
			this.getProfile()
		},
		methods: {
			getProfile() {
				const me = this.$gh.getUser()
				console.log('me', me)
				const profile = me.getProfile()
				console.log(profile)
				profile.then(res => {
					console.log('res', res)
				}).catch(err => {
					console.log('err', err)
				})
			}
		}
	}
</script>

<style>
</style>
