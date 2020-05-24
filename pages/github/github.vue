<template>
	<scroll-view scroll-y>
		<view class="order">
			<view class="item align-center">
				<u-avatar class="avatar2" :src="authUser.avatar_url" mode="square" size="large" />
				<view class="content">
					<view class="title u-line-2">{{ authUser.name }}<text class="sub-title">{{' (' + authUser.login + ')' }}</text></view>
					<view class="remark2">{{ authUser.bio }}</view>
					<view class="description">{{ authUser.created_at }}</view>
				</view>
				<view class="right">
					<u-icon name="arrow-right" color="#8799a3"></u-icon>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-3 text-center no-border">
			<view class="cu-item" v-for="(value, key) in numInfo" :key="key">
				<view class="badge text-xxl text-black">
					<block>{{value}}</block>
				</view>
				<!-- <view :class="['iconfont ' + iconList[index].icon, 'text-' + iconList[index].color, 'text-xxl']"></view> -->
				<text class="text-xl">{{key}}</text>
			</view>
		</view>
		<view class="bg-white">
			<view class="contri" v-html="contriHtml"></view>
		</view>
		<view class="bg-white">
			<view class="cu-list menu sm-border">
				<view class="cu-item" :class="baseInfoIcon[index].arrow?'arrow':''" v-for="(value, key, index) in baseInfo" :key="index"
				 :index="index">
					<view class="content">
						<text class="cu-avatar round iconfont" :class="['bg-' + baseInfoIcon[index].color, baseInfoIcon[index].icon]"
						 style="width: 48rpx;height: 48rpx;" />
						<text class="text-grey padding-left-sm">{{value}}</text>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
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
						icon: 'iconlianjie1',
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
			async getContributions(params) {
				const res = await this.$minApi.getContributions(params)
				const reg = /[\s\S]*(\<svg[\s\S]*\<\/svg\>)[\s\S]*/
				if (res && res.match(reg)) {
					this.contriHtml = (reg.exec(res)[1]).trim()
				}
			},
			async getAuthUser() {
				// const user = await this.$minApi.getAuthUser()
				// this.authUser = user
				this.authUser = {
					"login": "silianpan",
					"id": 7081687,
					"node_id": "MDQ6VXNlcjcwODE2ODc=",
					"avatar_url": "https://avatars1.githubusercontent.com/u/7081687?v=4",
					"gravatar_id": "",
					"url": "https://api.github.com/users/silianpan",
					"html_url": "https://github.com/silianpan",
					"followers_url": "https://api.github.com/users/silianpan/followers",
					"following_url": "https://api.github.com/users/silianpan/following{/other_user}",
					"gists_url": "https://api.github.com/users/silianpan/gists{/gist_id}",
					"starred_url": "https://api.github.com/users/silianpan/starred{/owner}{/repo}",
					"subscriptions_url": "https://api.github.com/users/silianpan/subscriptions",
					"organizations_url": "https://api.github.com/users/silianpan/orgs",
					"repos_url": "https://api.github.com/users/silianpan/repos",
					"events_url": "https://api.github.com/users/silianpan/events{/privacy}",
					"received_events_url": "https://api.github.com/users/silianpan/received_events",
					"type": "User",
					"site_admin": false,
					"name": "silianpan",
					"company": "Seal Studio",
					"blog": "http://silianpan.cn",
					"location": "Chengdu, Sichuan",
					"email": "liu.pan@silianpan.cn",
					"hireable": null,
					"bio": "Feel no regret for this life.",
					"public_repos": 28,
					"public_gists": 0,
					"followers": 14,
					"following": 23,
					"created_at": "2014-03-27T13:33:01Z",
					"updated_at": "2020-05-23T09:34:39Z"
				}
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
				this.getContributions({
					name: this.authUser.name
				})
			}
		}
	}
</script>
