<template>
	<view class="page-box">
		<view class="order" v-for="(item, index) in repos" :key="index">
			<view class="item">
				<view class="left">
					<image :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2">{{ item.author + ' / ' + item.name }}</view>
						<uni-badge class="uni-badge-left-margin" :text="index+1" type="primary" size="small" />
					</view>
					<view class="type">{{ item.description }}</view>
					<view class="delivery-time">今日{{ item.currentPeriodStars }}星</view>
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
				loadStatus: 'loadmore',
				repos: []
			}
		},
		methods: {
			async listRepo() {
				this.repos = await this.$minApi.listRepo()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		// width: 710rpx;
		background-color: #ffffff;
		// margin: 20rpx auto;
		// border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
	
		.top {
			display: flex;
			justify-content: space-between;
	
			.left {
				display: flex;
				align-items: center;
	
				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
	
			.right {
				color: $u-type-warning-dark;
			}
		}
	
		.item {
			display: flex;
			margin: 20rpx 0 0;
	
			.left {
				margin-right: 20rpx;
	
				image {
					width: 55rpx;
					height: 55rpx;
					border-radius: 10rpx;
				}
			}
	
			.content {
				width: 100%;
	
				.title {
					color: #0965d2;
					font-size: 28rpx;
					line-height: 50rpx;
				}
	
				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: #343e47;
				}
	
				.delivery-time {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
	
			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;
	
				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}
	
				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}
	
		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;
	
			.total-price {
				font-size: 32rpx;
			}
		}
	
		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;
	
			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}
	
			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}
	
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
	
		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
	
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
	
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>
