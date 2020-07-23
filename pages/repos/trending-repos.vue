<template>
	<view>
		<view class="order" v-for="(item, index) in repos" :key="index">
			<view class="item" @tap="clickRepoDetail(item)">
				<view class="left">
					<image @error="imageError(item)" class="avatar" :src="item.avatar" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view style="flex-flow: row wrap; justify-content: space-between; align-items: center; display: flex;">
						<view class="title u-line-2"><text selectable>{{ item.author + ' / ' + item.name }}</text></view>
						<uni-badge class="uni-badge-left-margin" :text="index+1" type="primary" size="normal" />
					</view>
					<view class="description"><text selectable>{{ item.description }}</text></view>
					<u-link class="link" :font-size="30" color="#0965d2" :href="item.url">{{ item.url }}</u-link>
					<view class="remark"><text selectable>{{ item.currentPeriodStars + $t('Stars') + ' ' + $t('Daily') }}</text></view>
					<u-row>
						<u-col span="2.5">
							<text class="iconfont iconyuandianzhong margin-right-xs" :style="{'color':item.languageColor}"></text>
							<text selectable class="u-font-lg">{{item.language}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="iconfont icongithub-star margin-right-xs text-main"></text>
							<text class="text-main u-font-lg">{{item.stars}}</text>
						</u-col>
						<u-col span="2.5">
							<text class="iconfont iconcode-fork margin-right-xs text-main"></text>
							<text class="text-main u-font-lg">{{item.forks}}</text>
						</u-col>
						<u-col span="4.5">
							<view class="flex justify-end">
								<!-- <u-avatar v-for="build in item.builtBy" :key="build.username" :src="build.avatar" mode="square" :size="42"
								 style="padding-right:2rpx;"></u-avatar> -->
								<image style="width: 42rpx;height: 42rpx;border-radius: 5rpx;margin-right: 2rpx;" @error="imageError(build)" v-for="build in item.builtBy" :key="build.username"
								 :src="build.avatar" mode="aspectFill"></image>
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
		props: {
			repos: {
				type: Array,
				default: []
			}
		},
		methods: {
			imageError(item) {
				item.avatar = '/static/img/60x60.png'
			},
			clickRepoDetail(item) {
				uni.navigateTo({
					url: `/pages/repos/detail?owner=${item.author}&repo=${item.name}`
				})
			}
		}
	}
</script>
