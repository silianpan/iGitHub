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
		<u-gap />
		<view class="cu-progress radius" @tap="clickLangPercent">
			<view v-for="item in reposLanguages" :key="item.lang" :style="[{ width: item.percent, 'background-color': item.color}]"></view>
		</view>

		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content">
					<text class="list-left-icon cu-avatar round iconfont iconcode" :style="{'background-color':languageColor}" />
					<text class="padding-left-sm">{{repo.language}}</text>
				</view>
				<view class="action">
					<view>{{$_.toString(repo.license.spdx_id) + ' · ' + $_.toString($NP.round($NP.divide(repo.size, 1024), 1)) + 'MB'}}</view>
				</view>
			</view>
		</view>

		<u-popup v-model="modelLangPercent" mode="top">
			<view class="cu-list menu card-menu margin-top">
				<view class="cu-item" v-for="item in reposLanguages" :key="item.lang">
					<view class="content">
						<text class="iconfont iconyuandianzhong margin-right-xs" :style="{'color':item.color}"></text>
						<text>{{item.lang}}</text>
					</view>
					<view class="action">
						<view>{{item.percent}}</view>
					</view>
				</view>
			</view>
		</u-popup>
	</scroll-view>
</template>

<script>
	import languageColors from '@/static/colors.json'
	export default {
		data() {
			return {
				modelLangPercent: false,
				numInfo: {},
				languageColor: '#ff7500',
				repo: {
					owner: {},
					license: {},
					size: 0
				},
				reposLanguages: []
			}
		},
		onLoad(option) {
			this.languageColor = option.languageColor
			this.getRepos(option.owner, option.repo)
			this.listReposLanguages(option.owner, option.repo)
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
			async listReposLanguages(owner, repo) {
				const ret = await this.$minApi.listReposLanguages(owner, repo)
				let sum = 0
				Object.values(ret).forEach(item => {
					sum = this.$NP.plus(sum, item)
				})
				let newRet = []
				for (let key in ret) {
					let lang = {
						'lang': key
					}
					lang['percent'] = this.$NP.round(this.$NP.times(this.$NP.divide(ret[key], sum), 100), 4) + '%'
					lang['color'] = languageColors[key].color
					newRet.push(lang)
				}
				this.reposLanguages = newRet
			},
			clickLangPercent() {
				this.modelLangPercent = true
			}
		}
	}
</script>
