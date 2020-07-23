<template>
	<view class="bg-white">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="(value, key, index) in baseInfo" :key="index" :index="index">
				<view class="content">
					<text selectable class="padding-left-sm flex-sub text-form-label">{{key}}</text>
					<text selectable class="padding-left-sm flex-treble text-form-value">{{value}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="padding flex flex-direction">
			<button class="cu-btn line-red margin-tb-sm" @tap="logoutTap">退出</button>
		</view> -->
	</view>
</template>

<script>
	export default {
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('BasicInfo')
			})
		},
		data() {
			return {
				baseInfo: {}
			}
		},
		onLoad(option) {
			this.baseInfo = JSON.parse(decodeURIComponent(option.baseInfo))
		}
		// methods: {
		// 	logoutTap() {
		// 		this.$store.dispatch('logoutAuth')
		// 	}
		// }
	}
</script>
