<template>
	<scroll-view :class="darkMode?'custom-dark':'custom-light'" class="w-h-100" scroll-y @scrolltolower="reachBottom" refresher-enabled
	 :refresher-triggered="triggered" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherpulling="onPulling">
		<view class="order" v-for="(item, index) in receivedEvents" :key="index">
			<view class="item">
				<view class="left">
					<image @error="imageError(item)" class="avatar" :src="item.actor.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<Event :item="item" />
				</view>
			</view>
		</view>
		<u-loadmore class="padding-bottom padding-top" :status="loadMoreStatus" icon-type="flower" />
	</scroll-view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Event from './event'
	export default {
		components: {
			Event
		},
		computed: {
			...mapGetters(['authUserInfo', 'themeBgColor', 'darkMode'])
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('News')
			})
			this.setNavBarColor()
		},
		onShow() {
			this.setNavBarColor()
		},
		data() {
			return {
				loadMoreStatus: 'loadmore',
				page: 1,
				perPage: 30,
				_freshing: false,
				triggered: false,
				receivedEvents: []
			}
		},
		onLoad() {
			this._freshing = false
			// load data
			this.listAuthUserReceivedEvents(true, false, res => {
				this.receivedEvents = res
			})
		},
		onReachBottom() {
			// next page
			this.page = ++this.page

			if (this._freshing) return
			this._freshing = true
			// set triggered = true
			if (!this.triggered)
				this.triggered = true
			this.listAuthUserReceivedEvents(false, false, res => {
				this.receivedEvents = this.receivedEvents.concat(res)
			})
		},
		methods: {
			setNavBarColor() {
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
			imageError(item) {
				item.actor.avatar_url = '/static/img/60x60.png'
			},
			async listAuthUserReceivedEvents(triggered, freshing, callbackFunc) {
				let res = ''
				if (this.authUserInfo && this.authUserInfo.name) {
					this.loadMoreStatus = 'loading'
					res = await this.$minApi.listAuthUserReceivedEvents(this.authUserInfo.name, this.page, this.perPage)
					if (this.$_.isFunction(callbackFunc)) {
						callbackFunc(res)
					}
				}
				this.triggered = triggered
				this._freshing = freshing

				if (this.$_.isEmpty(res)) {
					this.loadMoreStatus = 'nomore'
				} else {
					this.loadMoreStatus = 'loadmore'
				}
			},
			onPulling(e) {},
			onRefresh() {
				if (this._freshing) return
				this._freshing = true
				if (!this.triggered)
					this.triggered = true

				this.page = 1
				this.listAuthUserReceivedEvents(false, false, res => {
					this.receivedEvents = res
				})
			},
			onRestore() {
				this.triggered = 'restore'
			},
			onAbort() {},
			reachBottom() {}
		}
	}
</script>
