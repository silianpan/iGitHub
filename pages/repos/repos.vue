<template>
	<view>
		<view class="order" v-for="(item, index) in repos" :key="index">
			<view class="item" @tap="clickRepoDetail(item)">
				<view class="left">
					<image class="avatar" :src="item.owner.avatar_url" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view class="title u-line-2"><text selectable>{{ item.owner.login + ' / ' + item.name }}</text></view>
					<view class="description"><text selectable>{{ item.description }}</text></view>
					<u-link class="link" :font-size="30" color="#0965d2" :href="item.homepage">{{ item.homepage }}</u-link>
					<u-row>
						<u-col span="3">
							<text class="iconfont iconyuandianzhong margin-right-xs" :style="{'color':getColor(item.language)}"></text>
							<text selectable class="u-font-lg">{{item.language}}</text>
						</u-col>
						<u-col span="2">
							<text class="iconfont icongithub-star margin-right-xs text-main"></text>
							<text class="text-main u-font-lg">{{item.stargazers_count}}</text>
						</u-col>
						<u-col span="2">
							<text class="iconfont iconcode-fork margin-right-xs text-main"></text>
							<text class="text-main u-font-lg">{{item.forks_count}}</text>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import languageColors from '@/static/colors.json'
	export default {
		props: {
			repos: {
				type: Array,
				default: []
			}
		},
		methods: {
			getColor(key) {
				console.log(typeof(languageColors))
				return !this.$_.isNil(languageColors) && !this.$_.isEmpty(languageColors) ? languageColors[key].color : ''
			},
			clickRepoDetail(item) {
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${item.author}&repo=${item.name}`
				})
			}
		}
	}
</script>
