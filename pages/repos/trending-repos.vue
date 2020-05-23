<template>
	<view class="page-box">
		<view class="order" v-for="(item, index) in repos" :key="index">
			<view class="item">
				<view class="left">
					<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<!-- <u-avatar class="avatar" :src="item.avatar" mode="square" size="mini"/> -->
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2">{{ item.author + ' / ' + item.name }}</view>
						<uni-badge class="uni-badge-left-margin" :text="index+1" type="primary" size="small" />
					</view>
					<view class="description">{{ item.description }}</view>
					<view class="remark">今日{{ item.currentPeriodStars }}星</view>
					<u-row>
						<u-col span="2.5">
							<text class="iconfont iconyuandianzhong margin-right-xs" :style="{'color':item.languageColor}"></text>
							<text class="u-font-xs">{{item.language}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="iconfont icongithub-star margin-right-xs text-main"></text>
							<text class="text-main u-font-xs">{{item.stars}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="iconfont iconcode-fork margin-right-xs text-main"></text>
							<text class="text-main u-font-xs">{{item.forks}}</text>
						</u-col>
						<u-col span="4.5">
							<view class="flex justify-end">
								<u-avatar v-for="build in item.builtBy" :key="build.username" :src="build.avatar" mode="square" :size="40"
								 style="padding-right:2rpx;"></u-avatar>
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				repos: []
			}
		},
		methods: {
			async listRepo() {
				this.repos = await this.$minApi.listTrendingRepo()
			}
		}
	}
</script>
