<template>
	<view class="bg-white">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="(value, key, index) in baseInfo" :key="index" :index="index">
				<view class="content">
					<text class="text-gray padding-left-sm">{{key}}</text>
					<text class="text- padding-left-sm">{{value}}</text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn line-red margin-tb-sm" @tap="logoutTap">退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseInfo: {}
			}
		},
		onLoad(option) {
			this.baseInfo = JSON.parse(decodeURIComponent(option.baseInfo))
		},
		methods: {
			logoutTap() {
				this.$store.dispatch('logoutAuth')
			}
		}
	}
</script>
