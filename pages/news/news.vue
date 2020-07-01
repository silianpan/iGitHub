<template>
	<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom" refresher-enabled
	 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
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
	</scroll-view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import Event from './event'
	export default {
		components: {
			Event
		},
		data() {
			return {
				page: 1,
				perPage: 30,
				_freshing: false,
				triggered: false,
				receivedEvents: []
			}
		},
		computed: {
			...mapGetters(['authUserInfo'])
		},
		onLoad() {
			this._freshing = false
			// 触发onRefresh来加载自己的数据，如果不用这种方式，不要在此改变triggered的值
			this.listAuthUserReceivedEvents(true, false)
		},
		methods: {
			async listAuthUserReceivedEvents(triggered, freshing) {
				const res = await this.$minApi.listAuthUserReceivedEvents(this.authUserInfo.name, this.page, this.perPage)
				this.receivedEvents.concat(res)
				this.triggered = triggered
				this._freshing = freshing
			},
			clickRepoDetail(repoName) {
				const tmp = _.split(repoName, '/')
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${tmp[0]}&repo=${tmp[1]}`
				})
			},
			onPulling(e) {},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered) // 界面下拉触发，triggered可能不是true，要设为true  
					this.triggered = true
				this.listAuthUserReceivedEvents(false, false)
			},
			onRestore() {},
			onAbort() {},
			// scroll-view到底部加载更多
			reachBottom() {
				this.page++
				this.onRefresh()
			}
		}
	}
</script>
