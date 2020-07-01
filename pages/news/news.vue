<template>
	<view>
		<view class="order" v-for="(item, index) in receivedEvents" :key="index">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="item.actor.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<Event :item="item" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Event from './event'
	export default {
		components: {
			Event
		},
		data() {
			return {
				receivedEvents: []
			}
		},
		computed: {
			...mapGetters(['authUserInfo'])
		},
		onShow() {
			this.listAuthUserReceivedEvents()
		},
		methods: {
			async listAuthUserReceivedEvents() {
				this.receivedEvents = await this.$minApi.listAuthUserReceivedEvents(this.authUserInfo.name)
			},
			clickRepoDetail(repoName) {
				const tmp = _.split(repoName, '/')
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${tmp[0]}&repo=${tmp[1]}`
				})
			}
		}
	}
</script>
