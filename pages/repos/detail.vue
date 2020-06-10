<!-- repo detail -->
<template>
	<scroll-view scroll-y>
		<view class="order">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="repo.owner.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2">{{ repo.full_name }}</view>
					</view>
					<view class="description">{{ repo.description }}</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-3 text-center no-border">
			<view class="cu-item" v-for="(value, key) in numInfo" :key="key">
				<view class="badge text-xxl text-black">
					<block>{{value}}</block>
				</view>
				<text class="text-xl">{{key}}</text>
			</view>
		</view>
		<view class="cu-progress radius striped active">
			<view class="bg-red" :style="[{ width:'30%'}]"></view>
			<view class="bg-olive" :style="[{ width:'45%'}]"></view>
			<view class="bg-cyan" :style="[{ width:'25%'}]"></view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				numInfo: {},
				repo: {
					owner: {}
				},
				reposLanguage: []
			}
		},
		onLoad(option) {
			this.getRepos(option.owner, option.repo)
			this.getReposLanguage(option.owner, option.repo)
		},
		methods: {
			async getRepos(owner, repo) {
				this.repo = await this.$minApi.getRepos(owner, repo)
				this.numInfo = {
					watchers: this.repo.watchers,
					stargazers_count: this.repo.stargazers_count,
					forks: this.repo.forks
				}
			},
			async getReposLanguage(owner, repo) {
				this.reposLanguage = await this.$minApi.getReposLanguage(owner, repo)
				console.log(this.reposLanguage)
			}
		}
	}
</script>
