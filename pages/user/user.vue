<template>
	<view :class="darkMode?'custom-dark':'custom-light'" class="w-h-100">
		<scroll-view scroll-y class="w-h-100 u-skeleton">
			<view class="order" v-if="authUserInfo">
				<view class="item align-center u-skeleton-rect">
					<view class="left">
						<image @error="imageError" class="avatar2" :src="userAvatar || authUserInfo.avatar_url" mode="aspectFill"></image>
					</view>
					<view class="content">
						<view v-if="authUserInfo.name && authUserInfo.login" class="title u-line-2"><text selectable>{{ authUserInfo.name || '' }}<text
								 selectable class="sub-title">{{' (' + (authUserInfo.login || '') + ')' }}</text></text></view>
						<view class="description"><text selectable>{{ authUserInfo.bio }}</text></view>
						<view v-if="authUserInfo.created_at" class="remark2"><text selectable>{{ $t('JoinedOn') + ' ' + $u.timeFormat(new Date(authUserInfo.created_at).getTime(), 'yyyy-mm-dd hh:MM:ss') }}</text></view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" :color="darkMode?'#595959':'#8799a3'" @click="briefInfoClick" />
					</view>
				</view>
			</view>
			<view class="cu-list grid col-3 text-center no-border">
				<view class="cu-item" v-for="(value, key) in numInfo" :key="key">
					<view class="badge text-xxl grid-text">
						<block>{{value}}</block>
					</view>
					<!-- <view :class="['iconfont ' + iconList[index].icon, 'text-' + iconList[index].color, 'text-xxl']"></view> -->
					<text class="text-xl">{{$t(key)}}</text>
				</view>
			</view>
			<view class="user-bg">
				<view class="contri u-skeleton-rect" v-html="contriHtml"></view>
			</view>
			<view class="user-bg">
				<view class="cu-list menu">
					<view class="cu-item" :class="baseInfoIcon[index].arrow?'arrow':''" v-for="(value, key, index) in baseInfo" :key="index"
					 :index="index">
						<view class="content">
							<text class="list-left-icon cu-avatar round iconfont" :class="['bg-' + baseInfoIcon[index].color, baseInfoIcon[index].icon]" />
							<u-link v-if="baseInfoIcon[index].arrow" :font-size="30" color="#8799a3" class="link user-item padding-left-sm"
							 :href="value">{{ value }}</u-link>
							<text v-else class="user-item padding-left-sm">{{value}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="user-bg margin-top-xs">
				<view class="cu-list menu">
					<view class="cu-item arrow" @tap="tapSetting">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-cyan iconfont iconshezhi1" />
							<text class="user-item padding-left-sm">{{$t('Settings')}}</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-mauve iconfont iconguanyu1" />
							<text class="user-item padding-left-sm">{{$t('About')}}</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-red iconfont iconfankui1" />
							<text class="user-item padding-left-sm">{{$t('Feedback')}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="padding flex flex-direction user-bg">
			<button class="cu-btn line-red margin-tb-sm" @tap="tapLogout">{{$t('SignOut')}}</button>
		</view>
		<view v-if="appInfo.version" class="text-center padding-bottom-lg user-bg">
			{{appInfo.name}} {{appInfo.version}}
		</view>
		<u-skeleton :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				appInfo: {
					version: '',
					name: ''
				},
				userAvatar: '',
				loading: true,
				contriHtml: '',
				baseInfoIcon: [{
						key: 'company',
						icon: 'iconteam',
						color: 'orange'
					},
					{
						key: 'location',
						icon: 'iconaddress',
						color: 'green'
					},
					{
						key: 'email',
						icon: 'iconyoujian',
						color: 'blue'
					},
					{
						key: 'blog',
						icon: 'iconlianjie',
						color: 'purple',
						arrow: true
					}
				]
			}
		},
		computed: {
			...mapGetters(['authUserInfo', 'themeBgColor', 'darkMode']),
			numInfo() {
				return this.authUserInfo ? {
					public_repos: this.authUserInfo.public_repos,
					followers: this.authUserInfo.followers,
					following: this.authUserInfo.following
				} : {}
			},
			baseInfo() {
				return this.authUserInfo ? {
					company: this.authUserInfo.company,
					location: this.authUserInfo.location,
					email: this.authUserInfo.email,
					blog: this.authUserInfo.blog
				} : {}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('Profile')
			})
			this.initTheme()
			this.initContributions()
		},
		onShow() {
			this.initTheme()
		},
		onLoad() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.appInfo.version = wgtinfo.version
				this.appInfo.name = wgtinfo.name
			})
			//#endif
		},
		methods: {
			initTheme() {
				// navBar-bg-color
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: this.themeBgColor,
				    animation: {
				        duration: 400,
				        timingFunc: 'easeIn'
				    }
				})
				this.setDarkMode()
			},
			setDarkMode() {
				this.darkMode ? uni.setTabBarStyle({
				  backgroundColor: '#2a2b2d'
				}) : uni.setTabBarStyle({
					backgroundColor: '#ffffff'
				})
			},
			imageError() {
				if (this.repo && this.repo.owner) {
					this.repo.owner.avatar_url = '/static/img/60x60.png'
				}
			},
			tapLogout() {
				this.$store.dispatch('logoutAuth')
			},
			briefInfoClick() {
				const tmp = {
					name: this.authUserInfo.name,
					bio: this.authUserInfo.bio,
					...this.baseInfo
				}
				uni.navigateTo({
					url: '/pages/user/base-info?baseInfo=' + encodeURIComponent(JSON.stringify(tmp))
				})
			},
			async getContributions(params) {
				let res = await this.$minApi.getContributions(params)
				const reg = /[\s\S]*(\<svg[\s\S]*\<\/svg\>)[\s\S]*/
				if (res && res.match(reg)) {
					res = (reg.exec(res)[1]).trim()
					// fix: Horizontal and vertical position
					if (!this.$_.isEmpty(res)) {
						res = res.replace(/class="wday" dx="-10"/g, 'class="wday" dx="10"')
						res = res.replace(/\<text x="(\d+)" y="-8" class="month"\>(\S+)\<\/text\>/g, function(arg1, arg2, arg3) {
							return '<text x="' + (parseInt(arg2) + 10) + '" y="-8" class="month">' + arg3 + '</text>'
						})
						this.contriHtml = res
					}
				}
			},
			async initContributions() {
				await this.getContributions({
					name: this.authUserInfo.name
				})
				this.loading = false
			},
			tapSetting() {
				uni.navigateTo({
					url: '/pages/user/setting'
				})
			}
		}
	}
</script>
