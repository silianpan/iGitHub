<template>
	<view class="page-box u-skeleton">
		<view class="order" v-for="(item, index) in repos" :key="index">
			<view class="item" @tap="clickRepoDetail(item)">
				<view class="left">
					<image class="avatar u-skeleton-circle" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<!-- <u-avatar class="avatar" :src="item.avatar" mode="square" size="mini"/> -->
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2 u-skeleton-rect">{{ item.author + ' / ' + item.name }}</view>
						<uni-badge class="uni-badge-left-margin u-skeleton-fillet" :text="index+1" type="primary" size="small" />
					</view>
					<view class="description u-skeleton-rect">{{ item.description }}</view>
					<view class="remark u-skeleton-rect">今日{{ item.currentPeriodStars }}星</view>
					<u-row>
						<u-col span="2.5">
							<text class="u-skeleton-fillet iconfont iconyuandianzhong margin-right-xs" :style="{'color':item.languageColor}"></text>
							<text class="u-skeleton-fillet u-font-xs">{{item.language}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="u-skeleton-fillet iconfont icongithub-star margin-right-xs text-main"></text>
							<text class="u-skeleton-fillet text-main u-font-xs">{{item.stars}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="u-skeleton-fillet iconfont iconcode-fork margin-right-xs text-main"></text>
							<text class="u-skeleton-fillet text-main u-font-xs">{{item.forks}}</text>
						</u-col>
						<u-col span="4.5">
							<view class="flex justify-end">
								<u-avatar class="u-skeleton-circle" v-for="build in item.builtBy" :key="build.username" :src="build.avatar" mode="square" :size="40"
								 style="padding-right:2rpx;"></u-avatar>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<u-skeleton :loading="loading" :animation="true"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				repos: []
			}
		},
		methods: {
			async listRepo() {
				this.repos = await this.$minApi.listTrendingRepo()
				this.loading = false
			},
			clickRepoDetail(item) {
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${item.author}&repo=${item.name}&languageColor=${item.languageColor}`
				})
			}
		}
	}
</script>
