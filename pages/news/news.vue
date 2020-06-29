<template>
	<view>
		<view class="order" v-for="(item, index) in receivedEvents" :key="index">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="item.actor.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view class="title u-line-2">{{ item.actor.login }}<text>{{ ' ' + item.payload.action + ' ' }}</text><text class="sub-title">{{ item.repo.name }}</text></view>
					<view class="remark2"><text class="iconfont iconbook1 margin-right-xs" />{{ item.repo.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
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
			}
		}
	}
</script>
