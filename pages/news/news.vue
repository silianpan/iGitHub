<template>
	<view>
		<view class="order" v-for="(item, index) in receivedEvents" :key="index">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="item.actor.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<block v-if="item.type === 'WatchEvent'">
						<view class="title">
							<text selectable>{{ item.actor.login }}</text>
							<text class="text-black">{{ ' ' + item.payload.action + ' ' }}</text>
							<text class="sub-title" style="color: #0965d2!important;" @tap="clickRepoDetail(item.repo.name)">{{ item.repo.name }}</text>
						</view>
						<view class="remark2"><text class="iconfont icongithub-star margin-right-xs" />{{ $u.timeFrom(new Date(item.created_at).getTime(), 'yyyy-mm-dd hh:MM:ss') }}</view>
					</block>
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
