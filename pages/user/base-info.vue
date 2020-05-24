<template>
	<view class="bg-white">
		<view class="padding-lg">
			<view style="flex-flow: row wrap;flex-direction: row; align-items: center;display: flex;justify-content: space-between;"
			 v-for="(value, key, index) in baseInfo" :key="index" :index="index">
				<text style="flex:1" span="3">{{key}}</text>
				<text style="flex:3" span="6">{{value}}</text>
				<u-icon name="arrow-right" color="#8799a3" />
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
