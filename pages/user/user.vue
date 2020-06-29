<template>
	<view>
		<scroll-view scroll-y class="u-skeleton">
			<view class="order">
				<view class="item align-center u-skeleton-rect">
					<u-avatar class="avatar2" :src="authUser.avatar_url" mode="square" size="large" />
					<view class="content">
						<view v-if="authUser.name && authUser.login" class="title u-line-2"><text selectable>{{ authUser.name || '' }}<text selectable class="sub-title">{{' (' + (authUser.login || '') + ')' }}</text></text></view>
						<view class="remark2"><text selectable>{{ authUser.bio }}</text></view>
						<view v-if="authUser.created_at" class="description"><text selectable>注册于{{ $u.timeFormat(new Date(authUser.created_at).getTime(), 'yyyy-mm-dd hh:MM:ss') }}</text></view>
					</view>
					<view class="right">
						<u-icon name="arrow-right" color="#8799a3" @click="briefInfoClick" />
					</view>
				</view>
			</view>
			<view class="cu-list grid col-3 text-center no-border u-skeleton-rect">
				<view class="cu-item" v-for="(value, key) in numInfo" :key="key">
					<view class="badge text-xxl text-black">
						<block>{{value}}</block>
					</view>
					<!-- <view :class="['iconfont ' + iconList[index].icon, 'text-' + iconList[index].color, 'text-xxl']"></view> -->
					<text class="text-xl">{{key}}</text>
				</view>
			</view>
			<view class="bg-white">
				<view class="contri u-skeleton-rect" v-html="contriHtml"></view>
			</view>
			<view class="bg-white">
				<view class="cu-list menu sm-border u-skeleton-rect">
					<view class="cu-item" :class="baseInfoIcon[index].arrow?'arrow':''" v-for="(value, key, index) in baseInfo"
					 :key="index" :index="index">
						<view class="content">
							<text class="list-left-icon cu-avatar round iconfont" :class="['bg-' + baseInfoIcon[index].color, baseInfoIcon[index].icon]" />
							<u-link v-if="baseInfoIcon[index].arrow" :font-size="30" color="#8799a3" class="link text-grey padding-left-sm" :href="value">{{ value }}</u-link>
							<text v-else class="text-grey padding-left-sm">{{value}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bg-white margin-top-xs">
				<view class="cu-list menu sm-border u-skeleton-rect">
					<view class="cu-item arrow">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-cyan iconfont iconshezhi1" />
							<text class="text-grey padding-left-sm">设置</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-mauve iconfont iconguanyu1" />
							<text class="text-grey padding-left-sm">关于</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="list-left-icon cu-avatar round bg-red iconfont iconfankui1" />
							<text class="text-grey padding-left-sm">反馈</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="padding flex flex-direction">
			<button class="cu-btn line-red margin-tb-sm" @tap="tapLogout">退出</button>
		</view>
		<u-skeleton :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				contriHtml: '',
				authUser: {},
				numInfo: {},
				baseInfo: {},
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
		onReady() {
			this.getAuthUser()
		},
		methods: {
			tapLogout() {
				this.$store.dispatch('logoutAuth')
			},
			briefInfoClick() {
				const tmp = {
					name: this.authUser.name,
					bio: this.authUser.bio,
					...this.baseInfo
				}
				uni.navigateTo({
					url: '/pages/user/base-info?baseInfo=' + encodeURIComponent(JSON.stringify(tmp))
				})
			},
			async getContributions(params) {
				const res = await this.$minApi.getContributions(params)
				const reg = /[\s\S]*(\<svg[\s\S]*\<\/svg\>)[\s\S]*/
				if (res && res.match(reg)) {
					this.contriHtml = (reg.exec(res)[1]).trim()
				}
			},
			async getAuthUser() {
				this.authUser = await this.$minApi.getAuthUser()
				this.numInfo = {
					public_repos: this.authUser.public_repos,
					followers: this.authUser.followers,
					following: this.authUser.following
				}
				this.baseInfo = {
					company: this.authUser.company,
					location: this.authUser.location,
					email: this.authUser.email,
					blog: this.authUser.blog
				}
				await this.getContributions({
					name: this.authUser.name
				})
				this.loading = false
			}
		}
	}
</script>
