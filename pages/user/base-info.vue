<template>
	<view :class="darkMode?'custom-dark':'custom-light'" style="height: 100%;width: 100%;">
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" v-for="(value, key, index) in baseInfo" :key="index" :index="index">
				<view class="content">
					<text selectable class="text-grey flex-sub text-form-label">{{key}}</text>
					<text selectable class="user-item padding-left-sm flex-treble text-form-value">{{value}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="padding flex flex-direction">
			<button class="cu-btn line-red margin-tb-sm" @tap="logoutTap">退出</button>
		</view> -->
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['themeBgColor', 'darkMode'])
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('BasicInfo')
			})
			// navBar-bg-color
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: this.themeBgColor,
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
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
