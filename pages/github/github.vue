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
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				authUser: {}
			}
		},
		onReady() {
			this.getAuthUser()
		},
		methods: {
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

			}
		}
	}
</script>
